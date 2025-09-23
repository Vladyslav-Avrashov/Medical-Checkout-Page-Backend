import createHttpError from 'http-errors';
import { getCart, deleteCartItem } from '../services/cart.js';

export const getCartController = (req, res) => {
  const cart = getCart(req);
  res.json({ status: 200, message: 'Cart found successfully', cart });
};

export const deleteCartItemController = (req, res) => {
  const { cartItemId } = req.params;
  const success = deleteCartItem(req, cartItemId);
  if (!success) {
    throw createHttpError(404, 'Item not found in the cart');
  }
  res.json({
    status: 200,
    message: `Item with ID: ${cartItemId} removed from cart successfully`,
  });
};
