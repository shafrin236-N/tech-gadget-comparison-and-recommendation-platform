from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models.gadget import Gadget

router = APIRouter()


@router.get("/")
def get_gadgets(db: Session = Depends(get_db)):
    gadgets = db.query(Gadget).all()
    return gadgets


@router.post("/")
def create_gadget(
    name: str,
    brand: str,
    category: str,
    price: float,
    rating: float = 0.0,
    description: str = "",
    db: Session = Depends(get_db)
):
    new_gadget = Gadget(
        name=name,
        brand=brand,
        category=category,
        price=price,
        rating=rating,
        description=description
    )

    db.add(new_gadget)
    db.commit()
    db.refresh(new_gadget)

    return {
        "message": "Gadget created successfully",
        "gadget": new_gadget
    }
@router.get("/compare")
def compare_gadgets(
    gadget1_id: int,
    gadget2_id: int,
    db: Session = Depends(get_db)
):
    gadget1 = db.query(Gadget).filter(Gadget.id == gadget1_id).first()
    gadget2 = db.query(Gadget).filter(Gadget.id == gadget2_id).first()

    if not gadget1 or not gadget2:
        return {
            "error": "One or both gadgets were not found"
        }

    return {
        "gadget1": {
            "id": gadget1.id,
            "name": gadget1.name,
            "brand": gadget1.brand,
            "category": gadget1.category,
            "price": gadget1.price,
            "rating": gadget1.rating,
            "description": gadget1.description
        },
        "gadget2": {
            "id": gadget2.id,
            "name": gadget2.name,
            "brand": gadget2.brand,
            "category": gadget2.category,
            "price": gadget2.price,
            "rating": gadget2.rating,
            "description": gadget2.description
        }
    }
@router.get("/recommend")
def recommend_gadgets(
    category: str,
    max_price: float = 100000,
    db: Session = Depends(get_db)
):
    gadgets = (
        db.query(Gadget)
        .filter(
            Gadget.category == category,
            Gadget.price <= max_price
        )
        .order_by(Gadget.rating.desc())
        .all()
    )

    return {
        "category": category,
        "max_price": max_price,
        "recommendations": gadgets
    }