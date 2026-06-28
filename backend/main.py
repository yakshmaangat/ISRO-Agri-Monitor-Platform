from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.routes import router as api_router

app = FastAPI(
    title="ISRO Crop & Moisture Stress API",
    description="Mock API for AI-Driven Automated Crop type, Moisture Stress Detection and irrigation advisory.",
    version="1.0.0"
)

# Configure CORS for local development with Vite
origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "*" # allowing all for prototype
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router, prefix="/api")

@app.get("/")
def root():
    return {"message": "ISRO Hackathon Prototype API is running!"}
