from sqlalchemy.orm import Session

from app.models.gadget import Gadget


def get_all_gadgets(db: Session):
    return db.query(Gadget).all()


def get_gadget_by_id(db: Session, gadget_id: int):
    return db.query(Gadget).filter(
        Gadget.id == gadget_id
    ).first()