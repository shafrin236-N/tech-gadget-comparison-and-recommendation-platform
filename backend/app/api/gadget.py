from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.database import get_db

from app.schemas.gadget import (
    GadgetCreate,
    GadgetResponse
)

from app.services.gadget_service import (
    create_gadget,
    get_all_gadgets,
    get_gadget
)


router = APIRouter(
    prefix="/gadgets",
    tags=["Gadgets"]
)


@router.get(
    "/",
    response_model=list[GadgetResponse]
)
def list_gadgets(
    search: str | None = None,
    db: Session = Depends(get_db)
):

    return get_all_gadgets(
        db,
        search
    )


@router.get(
    "/{gadget_id}",
    response_model=GadgetResponse
)
def gadget_details(
    gadget_id: int,
    db: Session = Depends(get_db)
):

    gadget = get_gadget(
        db,
        gadget_id
    )

    if not gadget:

        raise HTTPException(
            status_code=404,
            detail="Gadget not found"
        )

    return gadget


@router.post(
    "/",
    response_model=GadgetResponse
)
def add_gadget(
    gadget_data: GadgetCreate,
    db: Session = Depends(get_db)
):

    return create_gadget(
        db,
        gadget_data
    )