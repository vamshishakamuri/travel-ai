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
model_name = "deepseek-ai/DeepSeek-R1-Distill-Qwen-1.5B"
model = AutoModelForCausalLM.from_pretrained(model_name, trust_remote_code=True)
tokenizer = AutoTokenizer.from_pretrained(model_name, trust_remote_code=True)

@app.get("/recommend/")
async def generate_travel_recommendation(
        destination: str = Query(..., description="Travel destination"),
        budget: str = Query("mid-range", description="Budget type: low, mid-range, luxury"),
        interests: str = Query("adventure", description="Interests: adventure, culture, nature, food")
):
    prompt = f"Generate a {budget} travel itinerary for {destination} focusing on {interests}. Include 5 activities with titles, descriptions, durations, and location links."

    inputs = tokenizer(prompt, return_tensors="pt")
    output = model.generate(**inputs, max_length=500)
    raw_text = tokenizer.decode(output[0], skip_special_tokens=True)

    # Example parsing (You should refine based on DeepSeek's output format)
    itinerary = []
    for index, line in enumerate(raw_text.split("\n")):
        if line.strip():
            itinerary.append({
                "title": f"Activity {index + 1}",
                "description": line.strip(),
                "timeCommitment": f"{(index % 3) + 1} hours",
                "mapLink": f"https://www.google.com/maps/search/{destination.replace(' ', '+')}",
                "category": interests
            })

    return {
        "destination": destination,
        "recommendation": raw_text,  # Still include a single string summary
        "itinerary": itinerary[:5]  # Limit to 5 items
    }
