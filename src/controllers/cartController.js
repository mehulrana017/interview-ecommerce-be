const cart = [];
export const addItemToCart = (req, res) => {
  cart.push(req.body);
  res
    .status(201)
    .json({ message: "Item added to cart", cart: cart, success: true });
};

export const getCart = (req, res) => {
  res.status(200).json(cart);
};
