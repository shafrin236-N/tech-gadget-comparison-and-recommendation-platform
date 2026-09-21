const gadgetImages = {
  1: "/images/galaxy-s25.jpg",
  2: "/images/iphone-16.jpg",
  3: "/images/iphone-16.jpg",
  4: "/images/oneplus-13.jpg",
  5: "/images/oneplus-13.jpg",
  6: "/images/pixel-9.jpg",
};

function getGadgetImage(gadget) {
  if (!gadget || !gadget.id) {
    return "/images/tech-products.jpg";
  }

  return (
    gadgetImages[gadget.id] ||
    "/images/tech-products.jpg"
  );
}

export default getGadgetImage;