import { Router } from 'express';
import {
  createOrderController,
  getAllOrdersController,
  getOrderByIdController,
} from '../controllers/orders.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../utils/validateBody.js';
import { orderCreateSchema } from '../validation/orders.js';
import { isValidId } from '../middlewares/isValidId.js';

const ordersRouter = Router();

ordersRouter.get('/', ctrlWrapper(getAllOrdersController));

ordersRouter.get('/:orderId', isValidId, ctrlWrapper(getOrderByIdController));

ordersRouter.post(
  '/',
  validateBody(orderCreateSchema),
  ctrlWrapper(createOrderController),
);

export default ordersRouter;
