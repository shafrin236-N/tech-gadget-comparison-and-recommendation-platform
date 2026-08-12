from fastapi import FastAPI

from app.api.auth import router as auth_router
from app.api.gadgets import router as gadget_router

app = FastAPI(
    title="Tech Gadget Comparison and Recommendation Platform"
)

app.include_router(auth_router, prefix="/auth", tags=["Authentication"])
app.include_router(gadget_router, prefix="/gadgets", tags=["Gadgets"])


@app.get("/")
def root():
    return {
        "message": "Tech Gadget Comparison API is running"
    }