from sqlalchemy import Column, Integer, String, Float, Text
from app.core.database import Base


class Gadget(Base):
    __tablename__ = "gadgets"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    brand = Column(String(100), nullable=False)
    category = Column(String(50), nullable=False)
    price = Column(Float, nullable=False)
    rating = Column(Float, default=0.0)
    description = Column(Text, nullable=True)