
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models.gadget import Gadget
from app.schemas.recommendation import RecommendationRequest

router = APIRouter()


# ---------------------------------------------------------
# 1. Test Gadget API
# ---------------------------------------------------------
@router.get("/test")
def gadget_test():
    return {
        "message": "Gadget API is working"
    }


# ---------------------------------------------------------
# 2. Get all gadgets
# ---------------------------------------------------------
@router.get("/")
def get_gadgets(
    db: Session = Depends(get_db)
):
    return db.query(Gadget).all()


# ---------------------------------------------------------
# 3. Create a gadget
# ---------------------------------------------------------
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
        name=name.strip(),
        brand=brand.strip(),
        category=category.strip().title(),
        price=price,
        rating=rating,
        description=description.strip()
    )

    db.add(new_gadget)
    db.commit()
    db.refresh(new_gadget)

    return {
        "message": "Gadget created successfully",
        "gadget": {
            "id": new_gadget.id,
            "name": new_gadget.name,
            "brand": new_gadget.brand,
            "category": new_gadget.category,
            "price": new_gadget.price,
            "rating": new_gadget.rating,
            "description": new_gadget.description
        }
    }


# ---------------------------------------------------------
# 4. Basic recommendation
# ---------------------------------------------------------
@router.get("/recommend")
def recommend_gadgets(
    category: str,
    max_price: float,
    db: Session = Depends(get_db)
):
    gadgets = (
        db.query(Gadget)
        .filter(
            Gadget.category == category.strip().title(),
            Gadget.price <= max_price
        )
        .order_by(
            Gadget.rating.desc(),
            Gadget.price.asc()
        )
        .all()
    )

    return {
        "category": category.strip().title(),
        "max_price": max_price,
        "recommendations": [
            {
                "id": gadget.id,
                "name": gadget.name,
                "brand": gadget.brand,
                "category": gadget.category,
                "price": gadget.price,
                "rating": gadget.rating,
                "description": gadget.description
            }
            for gadget in gadgets
        ]
    }


# ---------------------------------------------------------
# 5. Personalized recommendation
# ---------------------------------------------------------
@router.post("/personalized-recommend")
def personalized_recommend(
    request: RecommendationRequest,
    db: Session = Depends(get_db)
):
    gadgets = (
        db.query(Gadget)
        .filter(
            Gadget.category == request.category.strip().title(),
            Gadget.price <= request.budget
        )
        .all()
    )

    if not gadgets:
        return {
            "message": "No gadgets found within your budget",
            "category": request.category.strip().title(),
            "budget": request.budget,
            "usage": request.usage,
            "recommendations": [],
            "top_recommendation": None,
            "alternative_recommendation": None
        }

    priority_weights = {
        "High": 1.0,
        "Medium": 0.6,
        "Low": 0.3
    }

    performance_weight = priority_weights.get(
        request.performance_priority,
        0.6
    )

    battery_weight = priority_weights.get(
        request.battery_priority,
        0.6
    )

    camera_weight = priority_weights.get(
        request.camera_priority,
        0.6
    )

    usage = request.usage.strip().lower()

    results = []

    for gadget in gadgets:

        base_score = (
            (gadget.performance_score or 0.0)
            * performance_weight
            * 0.30
            + (gadget.battery_score or 0.0)
            * battery_weight
            * 0.20
            + (gadget.camera_score or 0.0)
            * camera_weight
            * 0.15
            + (gadget.value_score or 0.0)
            * 0.25
            + (gadget.durability_score or 0.0)
            * 0.10
        )

        if usage == "gaming":
            usage_score = gadget.gaming_score or 0.0
        elif usage == "coding":
            usage_score = gadget.coding_score or 0.0
        elif usage == "study":
            usage_score = gadget.study_score or 0.0
        else:
            usage_score = 0.0

        final_score = (
            base_score * 0.80
            + usage_score * 0.20
        )

        reasons = []

        if gadget.price <= request.budget:
            reasons.append("Fits your budget")

        if (gadget.performance_score or 0.0) >= 90:
            reasons.append("Strong performance")

        if (gadget.battery_score or 0.0) >= 90:
            reasons.append("Good battery life")

        if (gadget.camera_score or 0.0) >= 90:
            reasons.append("Good camera capability")

        if usage == "gaming" and (gadget.gaming_score or 0.0) >= 90:
            reasons.append("Suitable for gaming")

        if usage == "coding" and (gadget.coding_score or 0.0) >= 90:
            reasons.append("Suitable for coding")

        if usage == "study" and (gadget.study_score or 0.0) >= 90:
            reasons.append("Suitable for study")

        results.append({
            "id": gadget.id,
            "name": gadget.name,
            "brand": gadget.brand,
            "category": gadget.category,
            "price": gadget.price,
            "rating": gadget.rating,
            "description": gadget.description,
            "score": round(final_score, 2),
            "reasons": reasons
        })

    results.sort(
        key=lambda item: item["score"],
        reverse=True
    )

    top_recommendation = results[0] if results else None

    alternative_recommendation = None

    if len(results) > 1:
        alternatives = [
            item
            for item in results
            if item["id"] != top_recommendation["id"]
        ]

        if alternatives:
            cheapest = min(
                alternatives,
                key=lambda item: item["price"]
            )

            if cheapest["price"] < top_recommendation["price"]:
                savings = round(
                    top_recommendation["price"]
                    - cheapest["price"],
                    2
                )

                alternative_recommendation = {
                    "id": cheapest["id"],
                    "name": cheapest["name"],
                    "brand": cheapest["brand"],
                    "price": cheapest["price"],
                    "savings": savings,
                    "message": "Lower-priced alternative within your budget"
                }

    return {
        "category": request.category.strip().title(),
        "budget": request.budget,
        "usage": request.usage,
        "recommendations": results,
        "top_recommendation": top_recommendation,
        "alternative_recommendation": alternative_recommendation
    }


# ---------------------------------------------------------
# 6. Compare two gadgets
# ---------------------------------------------------------
@router.get("/compare")
def compare_gadgets(
    gadget1_id: int,
    gadget2_id: int,
    db: Session = Depends(get_db)
):
    gadget1 = (
        db.query(Gadget)
        .filter(Gadget.id == gadget1_id)
        .first()
    )

    gadget2 = (
        db.query(Gadget)
        .filter(Gadget.id == gadget2_id)
        .first()
    )

    if not gadget1 or not gadget2:
        raise HTTPException(
            status_code=404,
            detail="One or both gadgets were not found"
        )

    return {
        "gadget1": {
            "id": gadget1.id,
            "name": gadget1.name,
            "brand": gadget1.brand,
            "category": gadget1.category,
            "price": gadget1.price,
            "rating": gadget1.rating,
            "description": gadget1.description,
            "performance_score": gadget1.performance_score,
            "battery_score": gadget1.battery_score,
            "camera_score": gadget1.camera_score,
            "durability_score": gadget1.durability_score,
            "value_score": gadget1.value_score,
            "gaming_score": gadget1.gaming_score,
            "coding_score": gadget1.coding_score,
            "study_score": gadget1.study_score
        },
        "gadget2": {
            "id": gadget2.id,
            "name": gadget2.name,
            "brand": gadget2.brand,
            "category": gadget2.category,
            "price": gadget2.price,
            "rating": gadget2.rating,
            "description": gadget2.description,
            "performance_score": gadget2.performance_score,
            "battery_score": gadget2.battery_score,
            "camera_score": gadget2.camera_score,
            "durability_score": gadget2.durability_score,
            "value_score": gadget2.value_score,
            "gaming_score": gadget2.gaming_score,
            "coding_score": gadget2.coding_score,
            "study_score": gadget2.study_score
        }
    }


# ---------------------------------------------------------
# 7. Get one gadget by ID
# IMPORTANT: Keep this dynamic route LAST
# ---------------------------------------------------------
@router.get("/{gadget_id}")
def get_gadget(
    gadget_id: int,
    db: Session = Depends(get_db)
):
    gadget = (
        db.query(Gadget)
        .filter(Gadget.id == gadget_id)
        .first()
    )

    if not gadget:
        raise HTTPException(
            status_code=404,
            detail="Gadget not found"
        )

    return {
        "id": gadget.id,
        "name": gadget.name,
        "brand": gadget.brand,
        "category": gadget.category,
        "price": gadget.price,
        "rating": gadget.rating,
        "description": gadget.description,
        "performance_score": gadget.performance_score,
        "battery_score": gadget.battery_score,
        "camera_score": gadget.camera_score,
        "durability_score": gadget.durability_score,
        "value_score": gadget.value_score,
        "gaming_score": gadget.gaming_score,
        "coding_score": gadget.coding_score,
        "study_score": gadget.study_score
    }

