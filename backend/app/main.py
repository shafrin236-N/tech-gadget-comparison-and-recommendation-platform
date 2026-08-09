from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.auth import router as auth_router
from app.api.gadgets import router as gadget_router

from app.core.database import Base, engine

from app.models import Gadget, User


# Create database tables
Base.metadata.create_all(
    bind=engine
)


app = FastAPI(
    title="Tech Gadgets Comparison and Recommendation Application",

    description=(
        "A platform for comparing technology "
        "products and providing gadget recommendations."
    ),

    version="1.0.0"
)


# CORS configuration
app.add_middleware(
    CORSMiddleware,

    allow_origins=[
        "http://localhost:5173"
    ],

    allow_credentials=True,

    allow_methods=["*"],

    allow_headers=["*"]
)


# Register API routers
app.include_router(
    auth_router
)

app.include_router(
    gadget_router
)


@app.get("/")
def root():

    return {
        "message":
        "Tech Gadgets Comparison and Recommendation Application API"
    }


@app.get("/health")
def health():

    return {
        "status": "healthy"
    }