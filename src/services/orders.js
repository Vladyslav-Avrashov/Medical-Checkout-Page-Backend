import OrderCollection from '../db/models/Order.js';

export const createOrder = async (payload) => {
  const order = await OrderCollection.create(payload);
  return order;
};

export const getAllOrders = async () => {
  const orders = await OrderCollection.find();
  return orders;
};

export const getOrderById = async (orderId) => {
  const order = await OrderCollection.findById(orderId);
  return order;
};
