import json
from fastapi import FastAPI
from uagents import Model
from uagents.query import query

AGENT_ADDRESS = "agent1qgeygykn33ez3s5m9cpfj37l887xwpsd7k2lxy0qk9zee4rfxnv2smd7wcz"

class Orchestrate(Model):
    user_id: int

app = FastAPI()

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
