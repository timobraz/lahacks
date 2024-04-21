import uuid, requests, json, sys
from ai_engine import KeyValue, UAgentResponse, UAgentResponseType
from uagents.setup import fund_agent_if_low
from uagents import Agent, Context, Protocol, Model
from typing import Optional, List

i = int(sys.argv[1])

gemini = Agent(
    name="gemini",
    port=8800 + i,
    seed=f"google {i} gemini secret QtAB24dYye",
    endpoint=f"http://localhost:{8800 + i}/submit"
)

print(f"gemini address: {gemini.address}")

gemini_protocol = Protocol("Gemini")

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

@gemini_protocol.on_message(model=GeminiRequest, replies=UAgentResponse)
async def on_message(ctx: Context, sender: str, msg: GeminiRequest):
    ctx.logger.info(f"Recieved message from {sender}")
    try:
        request_id = str(uuid.uuid4())
        headers = {
            "Content-Type": "application/json",
        }
        safety_settings = [
            {
                "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
                "threshold": "BLOCK_NONE"
            },
            {
                "category": "HARM_CATEGORY_HATE_SPEECH",
                "threshold": "BLOCK_NONE"
            },
            {
                "category": "HARM_CATEGORY_HARASSMENT",
                "threshold": "BLOCK_NONE"
            },
            {
                "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
                "threshold": "BLOCK_NONE"
            }
        ]
        gemini_url = None
        data = None

        if msg.image != None:
            gemini_url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-pro-vision:generateContent?key={msg.api_key}"
            prompt = msg.prompt if msg.prompt != None else "Describe what you see in this image"
            data = {
                "contents": [{
                    "parts": [
                        {"text": prompt},
                        {
                            "inline_data": {
                                "mime_type": f"image/{msg.image.format}",
                                "data": msg.image.base64
                            }
                        }
                    ]
                }],
                "safetySettings": safety_settings,
            }
        elif msg.chat_history != None:
            gemini_url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key={msg.api_key}"
            data = {
                "contents": [{
                        "role": chat.role,
                        "parts": [{
                            "text": chat.text,
                        }]
                    } for chat in msg.chat_history],
                "safetySettings": safety_settings,
            }
        elif msg.prompt != None:
            gemini_url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key={msg.api_key}"
            data = {
                "contents": [{
                    "parts": [
                        {"text": msg.prompt},
                    ]
                }],
                "safetySettings": safety_settings,
            }
        else:
            await ctx.send(sender, UAgentResponse(message="Gemini needs a prompt and/or an image, or a chat history to complete", type=UAgentResponseType.ERROR))
            return

        ctx.logger.info(json.dumps(data))
        response = requests.post(gemini_url, headers=headers, data=json.dumps(data)).json()
        ctx.logger.info(response)

        if "error" in response:
            await ctx.send(sender, UAgentResponse(message=response["error"]["message"], type=UAgentResponseType.ERROR))
            return
        
        message = response["candidates"][0]["content"]["parts"][0]["text"]
        await ctx.send(sender, UAgentResponse(message=message, type=UAgentResponseType.FINAL, request_id=request_id))
    except Exception as e:
        ctx.logger.error(e)
        await ctx.send(sender, UAgentResponse(message=str(e), type=UAgentResponseType.ERROR))

gemini.include(gemini_protocol, publish_manifest=True)

fund_agent_if_low(gemini.wallet.address())
gemini.run()

# for i in {0..9}; do python agent.py $i & done
# pkill -f agent.py