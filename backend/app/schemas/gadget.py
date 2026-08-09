from pydantic import BaseModel, ConfigDict


class GadgetCreate(BaseModel):

    name: str

    brand: str

    category: str

    price: float

    processor: str | None = None

    ram: str | None = None

    storage: str | None = None

    display: str | None = None

    battery: str | None = None

    rating: float = 0.0

    description: str | None = None


class GadgetResponse(GadgetCreate):

    id: int

    model_config = ConfigDict(
        from_attributes=True
    )