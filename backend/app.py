from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from transformers import AutoModelForCausalLM, AutoTokenizer
import torch

app = FastAPI()

# Enable CORS for React frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Adjust based on frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load DeepSeek Model
model_name = "deepseek-ai/DeepSeek-R1-Distill-Llama-8B"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForCausalLM.from_pretrained(model_name, device_map="cpu")  # Force CPU usage

@app.get("/recommend/")
async def generate_travel_recommendation(
    destination: str = Query(..., description="Travel destination"),
    budget: str = Query("mid-range", description="Budget type: low, mid-range, luxury"),
    interests: str = Query("adventure", description="Interests: adventure, culture, nature, food")
):
    prompt = f"Suggest a {budget} travel itinerary for {destination} focusing on {interests}."
    inputs = tokenizer(prompt, return_tensors="pt").to("cpu")  # Force CPU usage
    output = model.generate(**inputs, max_length=200)
    recommendation = tokenizer.decode(output[0], skip_special_tokens=True)

    return {"destination": destination, "recommendation": recommendation}
