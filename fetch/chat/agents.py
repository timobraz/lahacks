from uagents import Agent, Bureau, Context, Model
from ai_engine import KeyValue, UAgentResponse, UAgentResponseType
from typing import List, Optional
import os
from dotenv import load_dotenv
from supabase import create_client, Client

load_dotenv()

url: str = os.environ.get("SUPABASE_URL")
key: str = os.environ.get("SUPABASE_KEY")
supabase: Client = create_client(url, key)

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
GEMINI_ID = "agent1q2m0ws7jucgqw7vnag2grrvdfmfmawt4q9exwt82cttza3cx0d9t6t994th"

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
    message: str

class Kickoff(Model):
    user1: str
    user2: str

class Complete(Model):
    user: str
    chat_history: List[str]

class Completion(Model):
    text: str

wingman = Agent(
    name="wingman",
    port=8000,
    seed="wingman secret",
    endpoint=["http://localhost:8000/submit"]
)

club = Bureau()

running_chats = []
names = []

for i in range(100):
    john = Agent(
        name=f"john{i}",
        port=8100 + i,
        seed=f"john{i} secret",
        endpoint=[f"http://localhost:{8100 + i}/submit"]
    )
    jane = Agent(
        name=f"jane{i}",
        port=8200 + i,
        seed=f"jane{i} secret",
        endpoint=[f"http://localhost:{8200 + i}/submit"]
    )

    jack = Agent(
        name=f"jack{i}",
        port=8300 + i,
        seed=f"jack{i} secret",
        endpoint=[f"http://localhost:{8300 + i}/submit"]
    )

    club.add(john)
    club.add(jane)
    club.add(jack)

    running_chats.append([])
    names.append([])

    @john.on_message(model=Complete)
    async def on_message(ctx: Context, sender: str, msg: Complete):
        await ctx.send(GEMINI_ID, GeminiRequest(
            api_key=GEMINI_API_KEY,
            prompt=f"Continue the conversation as if you were the character {ctx.name[:4]}",
            chat_history=msg.chat_history
        ))

    @john.on_message(model=UAgentResponse)
    async def on_message(ctx: Context, sender: str, msg: UAgentResponse):
        if sender != GEMINI_ID:
            return
        await ctx.send(club._agents[3 * int(ctx.name[4:]) + 2], Completion(text=msg.message))

    @jane.on_message(model=Complete)
    async def on_message(ctx: Context, sender: str, msg: Complete):
        await ctx.send(GEMINI_ID, GeminiRequest(
            api_key=GEMINI_API_KEY,
            prompt=f"Continue the conversation as if you were the character {ctx.name[:4]}",
            chat_history=msg.chat_history
        ))

    @jane.on_message(model=UAgentResponse)
    async def on_message(ctx: Context, sender: str, msg: UAgentResponse):
        if sender != GEMINI_ID:
            return
        await ctx.send(club._agents[3 * int(ctx.name[4:]) + 2], Completion(text=msg.message))

    @jack.on_message(model=Completion)
    async def on_message(ctx: Context, sender: str, msg: Completion):
        chat_history = running_chats[3 * int(ctx.name[4:])]
        chat_history.append(Chat(role=ctx.storage.get("curr name"), text=msg.message))

        await ctx.send(GEMINI_ID, GeminiRequest(
            api_key=GEMINI_API_KEY,
            prompt=f"Is this conversation over? If so, please say 'finished'. If not, please say 'continue'",
            chat_history=running_chats[3 * int(ctx.name[4:])]
        ))

    @jack.on_message(model=UAgentResponse)
    async def on_message(ctx: Context, sender: str, msg: UAgentResponse):
        if sender != GEMINI_ID:
            return
        if "finished" in msg.message.lower():
            # End conversation
        else:
            curr_name = ctx.storage.get("curr name")
            next_name = ctx.storage.get("next name")
            curr = ctx.storage.get("curr")
            next = ctx.storage.get("next")
            await ctx.send(next, Complete(user=next_name, chat_history=running_chats[3 * int(ctx.name[4:])]))
            ctx.storage.set("curr name", next_name)
            ctx.storage.set("curr", next)
            ctx.storage.set("next name", curr_name)
            ctx.storage.set("next", curr)

    @jack.on_message(model=Kickoff)
    async def on_message(ctx: Context, sender: str, msg: Kickoff):
        curr_name = msg.user1
        curr = club._agents[3 * int(ctx.name[4:])].address
        ctx.storage.set("curr name", curr_name)
        ctx.storage.set("curr", curr)
        ctx.storage.set("next name", msg.user2)
        ctx.storage.set("next", club._agents[3 * int(ctx.name[4:]) + 1].address)
        running_chats[int(ctx.name[4:])] = []
        await ctx.send(curr, Complete(user=curr_name, chat_history=[]))

@wingman.on_message(model=Orchestrate)
async def on_message(ctx: Context, sender: str, msg: Orchestrate):
    ctx.logger.info(f"Recieved message from {sender}")

if __name__ == "__main__":
    club.run()