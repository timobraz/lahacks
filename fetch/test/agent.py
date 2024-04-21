from ai_engine import KeyValue, UAgentResponse, UAgentResponseType
from uagents import Agent, Context, Protocol, Model
from typing import Optional, List
import os, base64
from dotenv import load_dotenv

load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
GEMINI_ID = "agent1qgkpuf4l9fgehjy9et9ttjyrmqcpknwhjlsqgna0uu4nzad7dnvdke3snsx"

test = Agent(name="test", seed="test secret QtAB24dYye", port=8000, endpoint=["http://localhost:8000/submit"])

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

# @test.on_interval(10)
# async def on_interval(ctx: Context):
#     await ctx.send(GEMINI_ID, GeminiRequest(api_key=GEMINI_API_KEY, prompt="Hello, Gemini!"))

# @test.on_interval(10)
# async def on_interval(ctx: Context):
#     chat_history = []
#     chat_history.append(Chat(role="user", text="For the duration of this chat, you will take on the persona of Andrew Jackson. Start the conversation with a pickup line."))
#     chat_history.append(Chat(role="model", text="I'm Jackson, a tough old hickory, and I'm here to win your heart like I won the Battle of New Orleans. Let's get this conversation rolling like thunder over water."))
#     chat_history.append(Chat(role="user", text="I'm doing well too!"))
#     await ctx.send(GEMINI_ID, GeminiRequest(api_key=GEMINI_API_KEY, chat_history=chat_history))

@test.on_interval(10)
async def on_interval(ctx: Context):
    with open("thor.jpg", "rb") as image_file:
        encoded_string = base64.b64encode(image_file.read())
        await ctx.send(GEMINI_ID, GeminiRequest(api_key=GEMINI_API_KEY, prompt="Generate a caption for this image", image=Image(format="jpeg", base64=encoded_string)))

@test.on_message(model=UAgentResponse)
async def on_message(ctx: Context, sender: str, msg: UAgentResponse):
    ctx.logger.info(f"Recieved message from {sender}")
    ctx.logger.info(f"Message: {msg.message}")

if __name__ == "__main__":
    test.run()
