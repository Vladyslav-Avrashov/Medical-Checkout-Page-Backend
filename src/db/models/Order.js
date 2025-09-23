import { Schema, model } from 'mongoose';
import { saveErrorHandler, setUpdateSettings } from './hooks.js';

const orderSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true },
    shippingMethod: { type: String, required: true },
    paymentMethod: { type: String, required: true },
    promoCode: { type: String },
    items: { type: Array, required: true },
    totalItems: { type: Number, required: true },
    subTotal: { type: Number, required: true },
    shippingFee: { type: Number, required: true },
    total: { type: Number, required: true },
  },
  { versionKey: false, timestamps: true },
);

orderSchema.post('save', saveErrorHandler);

orderSchema.pre('findOneAndUpdate', setUpdateSettings);

orderSchema.post('findOneAndUpdate', saveErrorHandler);

const OrderCollection = model('Order', orderSchema);

export default OrderCollection;
