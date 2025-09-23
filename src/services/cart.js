export const getCart = (req) => {
  const cart = req.session.cart || [];

  const totalItems = cart.length;
  const subTotal = cart.reduce((sum, item) => sum + item.price, 0);
  return {
    items: cart,
    totalItems,
    subTotal,
  };
};

export const deleteCartItem = (req, itemId) => {
  const cart = req.session.cart || [];
  const newCart = cart.filter((item) => item.id !== itemId);

  if (newCart.length === cart.length) return null;

  req.session.cart = newCart;
  return true;
};
