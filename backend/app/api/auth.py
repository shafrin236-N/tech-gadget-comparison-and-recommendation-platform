from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.database import get_db

from app.core.security import create_access_token

from app.schemas.user import (
    LoginRequest,
    TokenResponse,
    UserCreate,
    UserResponse
)

from app.services.auth_service import (
    authenticate_user,
    register_user
)


router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)


@router.post(
    "/register",
    response_model=UserResponse
)
def register(
    user_data: UserCreate,
    db: Session = Depends(get_db)
):

    try:

        user = register_user(
            db,
            user_data.name,
            user_data.email,
            user_data.password
        )

        return user

    except ValueError as error:

        raise HTTPException(
            status_code=400,
            detail=str(error)
        )


@router.post(
    "/login",
    response_model=TokenResponse
)
def login(
    login_data: LoginRequest,
    db: Session = Depends(get_db)
):

    user = authenticate_user(
        db,
        login_data.email,
        login_data.password
    )

    if not user:

        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )

    token = create_access_token(
        user.id
    )

    return {
        "access_token": token,
        "token_type": "bearer"
    }