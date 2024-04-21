from uagents import Agent, Context, Model, Bureau
from uagents.setup import fund_agent_if_low
from ai_engine import KeyValue, UAgentResponse, UAgentResponseType
from typing import List, Optional
import os, asyncio
from dotenv import load_dotenv
from supabase import create_client, Client

load_dotenv()

url: str = os.environ.get("SUPABASE_URL")
key: str = os.environ.get("SUPABASE_KEY")
supabase: Client = create_client(url, key)

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
GEMINI_ID = "agent1qgkpuf4l9fgehjy9et9ttjyrmqcpknwhjlsqgna0uu4nzad7dnvdke3snsx"

class Chat(Model):
    role: str
    text: str

class Image(Model):
    format: str
    base64: str

class GeminiRequest(Model):
    api_key: str
    prompt: Optional[str]
    image: Optional[Image]
    chat_history: Optional[List[Chat]]

class Orchestrate(Model):
    user_id: int

class Kickoff(Model):
    conversation_id: int
    user_id: int
    match_id: int
    user_name: str
    match_name: str
    user_prompt: str
    match_prompt: str

class Complete(Model):
    user: str
    chat_history: List[str]

class Completion(Model):
    text: str

wingman = Agent(
    name="wingman",
    port=8000,
    seed="wingman secret 1tA1Ug09XZ",
    endpoint="http://localhost:8000/submit"
)

bureau = Bureau(port=8000, endpoint="http://localhost:8000/submit")

for i in range(10):
    john = Agent(
        name=f"john{i}",
        seed=f"john{i} secret 1tA1Ug09XZ",
    )
    jane = Agent(
        name=f"jane{i}",
        seed=f"jane{i} secret 1tA1Ug09XZ",
    )

    jack = Agent(
        name=f"jack{i}",
        seed=f"jack{i} secret 1tA1Ug09XZ",
    )

    fund_agent_if_low(john.wallet.address())
    fund_agent_if_low(jane.wallet.address())
    fund_agent_if_low(jack.wallet.address())

    bureau.add(john)
    bureau.add(jane)
    bureau.add(jack)

    @john.on_message(model=Complete)
    async def on_message(ctx: Context, sender: str, msg: Complete):
        roles_assigned: List[Chat] = []
        system_prompt = msg.chat_history[0]
        system_prompt += "\nYou will initiate this conversation. Start with a pickup line."
        roles_assigned.append(Chat(role="user", text=system_prompt))
        if len(msg.chat_history) > 2:
            role = "model"
            for i in range(2, len(msg.chat_history)):
                roles_assigned.append(Chat(role=role, text=msg.chat_history[i]))
                role = "user" if role == "model" else "model"

        print("JOHN MESSAGE", roles_assigned)

        await ctx.send(GEMINI_ID, GeminiRequest(
            api_key=GEMINI_API_KEY,
            chat_history=roles_assigned
        ))

    @john.on_message(model=UAgentResponse)
    async def on_message(ctx: Context, sender: str, msg: UAgentResponse):
        print(msg.message)
        if sender != GEMINI_ID:
            return
        await ctx.send(bureau._agents[3 * int(ctx.name[4:]) + 2].address, Completion(text=msg.message))

    @jane.on_message(model=Complete)
    async def on_message(ctx: Context, sender: str, msg: Complete):
        roles_assigned: List[Chat] = []
        system_prompt = msg.chat_history[1]
        system_prompt += f"\nThey have initiated the conversation with the following pickup line: {msg.chat_history[2]}"
        roles_assigned.append(Chat(role="user", text=system_prompt))
        if len(msg.chat_history) > 3:
            role = "model"
            for i in range(3, len(msg.chat_history)):
                roles_assigned.append(Chat(role=role, text=msg.chat_history[i]))
                role = "user" if role == "model" else "model"

        print("JANE MESSAGE", roles_assigned)

        await ctx.send(GEMINI_ID, GeminiRequest(
            api_key=GEMINI_API_KEY,
            chat_history=roles_assigned
        ))

    @jane.on_message(model=UAgentResponse)
    async def on_message(ctx: Context, sender: str, msg: UAgentResponse):
        if sender != GEMINI_ID:
            return
        await ctx.send(bureau._agents[3 * int(ctx.name[4:]) + 2].address, Completion(text=msg.message))

    @jack.on_message(model=Completion)
    async def on_message(ctx: Context, sender: str, msg: Completion):
        chat_history = ctx.storage.get("chat history")
        chat_history.append(msg.text)
        ctx.storage.set("chat history", chat_history)

        prompt = f"""
            This conversation cannot go on forever, it must come to an end with haste. However, we wouldn't want it to end before everything's been said. You need to determine when this point is. Be strict, don't let it get stale. 
            Don't let the users repeat themselves, and don't let them go off on tangents. Keep the conversation focused and moving forward.
            here is the conversation so far:
            {chat_history}
            Is this conversation over? If so, please say 'finished'. If not, please say 'continue'
        """

        await ctx.send(GEMINI_ID, GeminiRequest(
            api_key=GEMINI_API_KEY,
            prompt=prompt
        ))

    @jack.on_message(model=UAgentResponse)
    async def on_message(ctx: Context, sender: str, msg: UAgentResponse):
        if sender != GEMINI_ID:
            return
        chat_history = ctx.storage.get("chat history")
        if "finished" in msg.message.lower():
            print("finished!", chat_history)
            print(msg.message)
            return
        else:
            curr_name = ctx.storage.get("curr name")
            if curr_name == ctx.storage.get("match name"):
                curr_name = ctx.storage.get("user name")
                curr_address = ctx.storage.get("user address")
            else:
                curr_name = ctx.storage.get("match name")
                curr_address = ctx.storage.get("match address")
            print("curr name ", curr_name)
            await ctx.send(curr_address, Complete(user=curr_name, chat_history=chat_history))
            ctx.storage.set("curr name", curr_name)

    @jack.on_message(model=Kickoff)
    async def on_message(ctx: Context, sender: str, msg: Kickoff):
        user_address = bureau._agents[3 * int(ctx.name[4:])].address
        ctx.storage.set("curr name", msg.user_name)
        ctx.storage.set("finished", False)
        ctx.storage.set("user id", msg.user_id)
        ctx.storage.set("match id", msg.match_id)
        ctx.storage.set("user name", msg.user_name)
        ctx.storage.set("user address", user_address)
        ctx.storage.set("match name", msg.match_name)
        ctx.storage.set("match address", bureau._agents[3 * int(ctx.name[4:]) + 1].address)
        ctx.storage.set("user prompt", msg.user_prompt)
        ctx.storage.set("match prompt", msg.match_prompt)
        chat_history = []
        chat_history.append(msg.user_prompt)
        chat_history.append(msg.match_prompt)
        ctx.storage.set("chat history", chat_history)
        await ctx.send(user_address, Complete(user=msg.user_name, chat_history=chat_history))

@wingman.on_message(model=Orchestrate)
async def on_message(ctx: Context, sender: str, msg: Orchestrate):
    response = supabase.table("users").select("*").execute()
    user = response["data"][0]
    ctx.storage.set("user", user)
    matches = []
    for index, match in enumerate(matches):
        response = supabase.table("conversations").insert({"user1": user.id, "user2": match.id}).execute()
        await ctx.send(bureau._agents[3 * index + 2].address, Kickoff(
            conversation_id=response["data"][0]["id"],
            user_id=user.id,
            match_id=match.id,
            user=user.name, 
            match=match.name, 
            user_prompt=user.prompt, 
            match_prompt=match.prompt
        ))
        ctx.logger.info(f"Sent kickoff to {bureau._agents[3 * index + 2].address}")

@wingman.on_interval(1000)
async def on_interval(ctx: Context):
    await ctx.send(bureau._agents[2].address, Kickoff(
        conversation_id=1,
        user_id=1,
        match_id=2,
        user_name="Andrew", 
        match_name="John", 
        user_prompt="For the duration of this chat, you will take on the persona of Andrew Jackson.", 
        match_prompt="For the duration of this chat, you will take on the persona of John Adams."
    ))
    print("sent")

@wingman.on_message(model=UAgentResponse)
async def on_message(ctx: Context, sender: str, msg: UAgentResponse):
    if sender != GEMINI_ID:
        return
    print(msg.message)

fund_agent_if_low(wingman.wallet.address())
bureau.add(wingman)

if __name__ == "__main__":
    # john.run()

    for agent in bureau._agents:
        print(f"{agent.name} address: {agent.address}")

    bureau.run()


# async def run_agent(agent: Agent):
#     await agent.run()

# if __name__ == "__main__":
#     loop = asyncio.get_event_loop()
#     tasks = [run_agent(agent) for agent in bureau]
#     loop.run_until_complete(asyncio.gather(*tasks))