from sqlalchemy import Column, Float, Integer, String, Text

from app.core.database import Base


class Gadget(Base):

    __tablename__ = "gadgets"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    name = Column(
        String(150),
        nullable=False
    )

    brand = Column(
        String(100),
        nullable=False
    )

    category = Column(
        String(100),
        nullable=False
    )

    price = Column(
        Float,
        nullable=False
    )

    processor = Column(
        String(150),
        nullable=True
    )

    ram = Column(
        String(50),
        nullable=True
    )

    storage = Column(
        String(100),
        nullable=True
    )

    display = Column(
        String(150),
        nullable=True
    )

    battery = Column(
        String(100),
        nullable=True
    )

    rating = Column(
        Float,
        default=0.0
    )

    description = Column(
        Text,
        nullable=True
    )