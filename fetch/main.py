import json, os, sys
from fastapi import FastAPI
from uagents import Model
from uagents.query import query
from pyngrok import ngrok
from pydantic import BaseSettings
from dotenv import load_dotenv

load_dotenv()

AGENT_ADDRESS = "agent1qgeygykn33ez3s5m9cpfj37l887xwpsd7k2lxy0qk9zee4rfxnv2smd7wcz"

class Settings(BaseSettings):
    BASE_URL = "http://localhost:8900"
    USE_NGROK = os.environ.get("USE_NGROK", "False") == "True"

settings = Settings()

class Orchestrate(Model):
    user_id: int

app = FastAPI()

if settings.USE_NGROK and os.environ.get("NGROK_AUTHTOKEN"):
    from pyngrok import ngrok

    port = sys.argv[sys.argv.index("--port") + 1] if "--port" in sys.argv else "8000"
    public_url = ngrok.connect(port).public_url
    settings.BASE_URL = public_url
    print(f"ngrok tunnel: {public_url}")
    
@app.get("/")
def read_root():
    return "healthy"

@app.post("/orchestrate")
async def call_agent(req: Orchestrate):
    print(req.user_id)
    try:
        print(f"calling agent with user_id: {req.user_id}")
        response = await query(destination=AGENT_ADDRESS, message=Orchestrate(user_id=req.user_id), timeout=15.0)
        data = json.loads(response.decode_payload())
        return f"successful call - agent response: {data}"
    except Exception as e:
        return f"unsuccessful agent call - error: {e}"
