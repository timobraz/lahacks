from uagents import Agent, Context, Model, Bureau
from uagents.setup import fund_agent_if_low
from ai_engine import KeyValue, UAgentResponse, UAgentResponseType
from typing import List, Optional
import os, re, sys
from dotenv import load_dotenv
from supabase import create_client, Client

load_dotenv()

url: str = os.environ.get("SUPABASE_URL")
key: str = os.environ.get("SUPABASE_KEY")
supabase: Client = create_client(url, key)

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

GEMINI_ID = [
    "agent1q0d9ym4uut5p97wyhwqhtjs7sm83feqnn549xgttg39jcgrwwgqwwv8efwj",
    "agent1qw0tgpq4fqqm4heezmtqxspez082zltlvy7xwmp8325xu652ay4yyc0y509",
    "agent1qvw2ep6pz5lzsz3a4dv62fhswh4v4e3q9vjlqm0vzcrv8px22wwfg6xsrgz",
    "agent1qw0kl7hp7ng3pzupkv9hpssu4ajamct5rxl9z9cs9qvmchcdjqd4unapepw",
    "agent1qgftkcjs5rh3qq5k6wdna2005dvrs3y7wedyscml3rlftexetcf97wl9dmz",
    "agent1q0w3egxmjdg5uvqlul8ejdq6q2zccm2lfsjaj66xa7zrx0qd3xrpy93dc76",
    "agent1qfu8f9t2ydjpmxt2p42k7flg67vgdhky7f8m4ayyky5t7x9k2sw62f7a3a5",
    "agent1qtn6gshded94tdlztxvpsrh5tyhxrpexqp56rv25gzykg96nakcgufwyyhd",
    "agent1q0cd0x4myxtlu384z8nhjgg9xd0flghcu8kk0ytkyg3hewuggdrjq735yca",
    "agent1qgag64a9c7ue6w03yu6vpkhxz79znlk0xgcgh3utp4u4c3hqgze77ud4e7k",
][int(sys.argv[1])]

MED_IDS = [
    "agent1qgaqcs3jtd842w490wtu4xp57vxffy95855ls0lxlmn4h3p2a46fxt0q52t",
    "agent1qvk5lvuzg5ah3mqp5r43hww68pfqgrp40rpy9cp0q3py79ths3mlwmz0fc9",
    "agent1q20uz6vw7hzdmycnllpgjw0x0wyax2sdswftj96e4yccsptsnvye72zxqrq",
    "agent1q2x34dwxrveu8vm2575vw40ednmarevxjyetn8m60h89ywr4fh252qmv65c",
    "agent1qwncf3yx4uchd054ekqrn3rv6evf0eg3n0wa55l2z6x7wxah9zthsd7k64e",
    "agent1q0trmnax5ha67vyxyujpgfkdr4ulvefgwg2aq9at5epj226lncmg55td6gc",
    "agent1qwpkvw2jfrszl9gns0gczzj65ma03w743n6qj0e5qtzfwy4tsqx453a0j0n",
    "agent1qvadu7zq58tvwjdglmad2mzeqmhcsfgyckkaafrlw432dakmfefuv8yh04l",
    "agent1qw3trmyvvdt3qa8u49sj7mu5pwfzhkn2qvj2vxjgcum6nuytvajtgaemswa",
    "agent1qvrrc4xkfxgs3thqz77ua40p2yp86cudzuvdvktfk55ft7c6z6xgum70akq",
]

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

i = int(sys.argv[1])

wingman = Agent(
    name="wingman",
    port=8000,
    seed="wingman secret 1tA1Ug09XZ",
    endpoint="http://localhost:8000/submit"
)

fund_agent_if_low(wingman.wallet.address())

club = Bureau(port=8000 + i, endpoint=f"http://localhost:{8000 + i}/submit")

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

print(f"jack address: {jack.address}")

fund_agent_if_low(john.wallet.address())
fund_agent_if_low(jane.wallet.address())
fund_agent_if_low(jack.wallet.address())

club.add(john)
club.add(jane)
club.add(jack)

@john.on_message(model=Complete)
async def on_message(ctx: Context, _sender: str, msg: Complete):
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
    await ctx.send(jack.address, Completion(text=msg.message))

@jane.on_message(model=Complete)
async def on_message(ctx: Context, _sender: str, msg: Complete):
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
    await ctx.send(jack.address, Completion(text=msg.message))

@jack.on_message(model=Completion)
async def on_message(ctx: Context, _sender: str, msg: Completion):
    chat_history = ctx.storage.get("chat_history")
    chat_history.append(msg.text)
    ctx.storage.set("chat_history", chat_history)

    author_id = ctx.storage.get("user_id") if ctx.storage.get("curr_name") == ctx.storage.get("user_name") else ctx.storage.get("match_id")

    supabase.table("messages").insert({
        "authorId": author_id, 
        "conversationId": ctx.storage.get("conversation id"), 
        "message": msg.text
    }).execute()

    prompt = f"""
        This conversation cannot go on forever, it must come to an end at some point. However, we wouldn't want it to end until everything's been said.
        You need to determine when this point is. Be strict, don't let it get stale, but don't get too eager to end it either.
        DON'T LET USERS REPEAT THEMSELVES, and don't let them go off on tangents, but don't cut them off too soon either.
        THE CONVERSATION NEEDS TO BE MOVING FORWARDS AT ALL TIMES.
        here is the conversation so far:
        {chat_history}
        IS THIS CONVERSATION OVER? If so, please say 'finished'. If not, please say 'continue'
    """

    await ctx.send(GEMINI_ID, GeminiRequest(
        api_key=GEMINI_API_KEY,
        prompt=prompt
    ))

@jack.on_message(model=UAgentResponse)
async def on_message(ctx: Context, sender: str, msg: UAgentResponse):
    if sender != GEMINI_ID:
        return
    chat_history = ctx.storage.get("chat_history")
    if ctx.storage.get("finished"):
        print("MESSAGEEE: ", msg.message)
        supabase.table("compatability").insert({
            "userId": ctx.storage.get("user_id"), 
            "matchId": ctx.storage.get("match_id"),
            "compatability": int(re.search(r'\d+', msg.message).group())
        }).execute()
    elif "finished" in msg.message.lower():
        print("finished!", chat_history)
        print(msg.message)
        ctx.storage.set("finished", True)
        supabase.table("conversations").update({
            "finished": True
        }).eq("id", ctx.storage.get("conversation id")).execute()

        prompt = f"""
            You will see a completed conversation. You will determine the compatability of the two users based on the conversation.
            here is the conversation so far:
            {chat_history}
            Rate the compatability of the two users on a scale of 1 to 100. 1 being not compatible at all, 100 being extremely compatible.
            BE HONEST. BE CRITICAL. BE FAIR.
            Respond with only the number.
        """
        await ctx.send(GEMINI_ID, GeminiRequest(
            api_key=GEMINI_API_KEY,
            prompt=prompt
        ))
    else:
        curr_name = ctx.storage.get("curr_name")
        if curr_name == ctx.storage.get("match_name"):
            curr_name = ctx.storage.get("user_name")
            curr_address = john.address
        else:
            curr_name = ctx.storage.get("match_name")
            curr_address = jane.address
        print("curr_name ", curr_name)
        await ctx.send(curr_address, Complete(user=curr_name, chat_history=chat_history))
        ctx.storage.set("curr_name", curr_name)

@jack.on_message(model=Kickoff)
async def on_message(ctx: Context, _sender: str, msg: Kickoff):
    ctx.storage.set("curr_name", msg.user_name)
    ctx.storage.set("conversation id", msg.conversation_id)
    ctx.storage.set("finished", False)
    ctx.storage.set("user_id", msg.user_id)
    ctx.storage.set("match_id", msg.match_id)
    ctx.storage.set("user_name", msg.user_name)
    ctx.storage.set("match_name", msg.match_name)
    # ctx.storage.set("user_prompt", msg.user_prompt)
    # ctx.storage.set("match_prompt", msg.match_prompt)
    chat_history = []
    chat_history.append(msg.user_prompt)
    chat_history.append(msg.match_prompt)
    ctx.storage.set("chat_history", chat_history)
    await ctx.send(john.address, Complete(user=msg.user_name, chat_history=chat_history))

@wingman.on_query(model=Orchestrate)
async def on_query(ctx: Context, sender: str, msg: Orchestrate):
    print(f"called from: {sender}")
    response = supabase.table("users").select("*").eq("id", msg.user_id).execute()
    user = response.data[0]
    ctx.storage.set("user", user)
    response = supabase.table("users").select("*").neq("id", msg.user_id).execute()
    matches = response.data
    for index, match in enumerate(matches[:10]):
        response = supabase.table("conversations").insert({"user1": user["id"], "user2": match["id"]}).execute()
        await ctx.send(MED_IDS[index], Kickoff(
            conversation_id=response.data[0]["id"],
            user_id=user["id"],
            match_id=match["id"],
            user_name=user["name"], 
            match_name=match["name"], 
            user_prompt=user["bio"], 
            match_prompt=match["bio"]
        ))
        ctx.logger.info(f"Sent kickoff to {MED_IDS[index]}")

    await ctx.send(sender, UAgentResponse(message="Orchestration complete", type=UAgentResponseType.FINAL))

# @wingman.on_interval(1000)
# async def on_interval(ctx: Context):
#     await ctx.send(club._agents[2].address, Kickoff(
#         conversation_id=1,
#         user_id=1,
#         match_id=2,
#         user_name="Andrew", 
#         match_name="John", 
#         user_prompt="For the duration of this chat, you will take on the persona of Andrew Jackson.", 
#         match_prompt="For the duration of this chat, you will take on the persona of John Adams."
#     ))

if i == 0:
    club.add(wingman)

club.run()

# for i in {0..9}; do python agents.py $i & done
# pkill -f agents.py