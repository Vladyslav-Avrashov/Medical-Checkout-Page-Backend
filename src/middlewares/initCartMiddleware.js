import { DEFAULT_CART } from '../constants/cart.js';

export const initCartMiddleware = (req, res, next) => {
  if (
    !req.session.cart ||
    req.session.cart.length === 0 ||
    req.session.resetAfterOrder
  ) {
    req.session.cart = [...DEFAULT_CART];
    req.session.resetAfterOrder = false;
  }
  next();
};
