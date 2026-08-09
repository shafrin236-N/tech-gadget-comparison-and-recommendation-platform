from sqlalchemy.orm import Session

from app.models.gadget import Gadget
from app.schemas.gadget import GadgetCreate


def create_gadget(
    db: Session,
    gadget_data: GadgetCreate
):

    gadget = Gadget(
        **gadget_data.model_dump()
    )

    db.add(gadget)

    db.commit()

    db.refresh(gadget)

    return gadget


def get_all_gadgets(
    db: Session,
    search: str | None = None
):

    query = db.query(Gadget)

    if search:

        search_pattern = f"%{search}%"

        query = query.filter(
            (Gadget.name.ilike(search_pattern))
            |
            (Gadget.brand.ilike(search_pattern))
            |
            (Gadget.category.ilike(search_pattern))
        )

    return query.all()


def get_gadget(
    db: Session,
    gadget_id: int
):

    return (
        db.query(Gadget)
        .filter(Gadget.id == gadget_id)
        .first()
    )