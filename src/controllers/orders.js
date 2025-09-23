import createHttpError from 'http-errors';
import { createOrder, getAllOrders, getOrderById } from '../services/orders.js';
import { getCart } from '../services/cart.js';
import { SHIPPING_FEE } from '../constants/cart.js';

export const createOrderController = async (req, res) => {
  const cart = getCart(req);

  if (!cart.items || cart.items.length === 0) {
    throw createHttpError(400, 'Cannot create an order with an empty cart');
  }

  const orderData = {
    ...req.body,
    items: cart.items,
    totalItems: cart.totalItems,
    subTotal: cart.subTotal,
    shippingFee: SHIPPING_FEE,
    total: cart.subTotal + SHIPPING_FEE,
  };

  const order = await createOrder(orderData);

  req.session.resetAfterOrder = true;

  res.status(201).json({
    status: 201,
    message: 'Order created successfully!',
    data: order,
  });
};

export const getAllOrdersController = async (req, res) => {
  const orders = await getAllOrders();
  res.status(200).json({
    status: 200,
    message: 'Successfully retrieved all orders!',
    data: orders,
  });
};

export const getOrderByIdController = async (req, res) => {
  const { orderId } = req.params;
  const order = await getOrderById(orderId);

  if (!order) {
    throw createHttpError(404, `Order with id ${orderId} not found`);
  }

  res.status(200).json({
    status: 200,
    message: `Successfully found order with id ${orderId}!`,
    data: order,
  });
};
