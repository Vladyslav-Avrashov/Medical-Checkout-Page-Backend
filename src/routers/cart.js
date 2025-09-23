import { Router } from 'express';
import {
  getCartController,
  deleteCartItemController,
} from '../controllers/cart.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const cartRouter = Router();

cartRouter.get('/', ctrlWrapper(getCartController));
cartRouter.delete('/:cartItemId', ctrlWrapper(deleteCartItemController));

export default cartRouter;
