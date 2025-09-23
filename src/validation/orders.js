import Joi from 'joi';

const baseOrderSchema = {
  name: Joi.string().min(3).max(30).trim().messages({
    'string.base': 'Name must be a string',
    'string.min': 'Name must be at least 3 characters long',
    'string.max': 'Name should be no longer than 30 characters',
    'string.empty': 'Name is required',
  }),

  email: Joi.string().max(30).email().trim().lowercase().messages({
    'string.base': 'Email must be a string',
    'string.max': 'Email should be no longer than 30 characters',
    'string.email': 'Email must be a valid email address',
    'string.empty': 'Email is required',
  }),

  phone: Joi.string()
    .pattern(/^[\+]?[1-9][\d]{0,15}$/)
    .messages({
      'string.base': 'Phone must be a string',
      'string.pattern.base': 'Phone must be a valid phone number',
      'string.empty': 'Phone is required',
    }),

  address: Joi.string().min(3).max(30).trim().messages({
    'string.base': 'Address must be a string',
    'string.min': 'Address must be at least 3 characters long',
    'string.max': 'Address should be no longer than 30 characters',
    'string.empty': 'Address is required',
  }),

  city: Joi.string().min(3).max(30).trim().messages({
    'string.base': 'City must be a string',
    'string.min': 'City must be at least 3 characters long',
    'string.max': 'City should be no longer than 30 characters',
    'string.empty': 'City is required',
  }),

  postalCode: Joi.string().min(3).max(10).trim().messages({
    'string.base': 'Postal code must be a string',
    'string.min': 'Postal code must be at least 3 characters long',
    'string.max': 'Postal code should be no longer than 10 characters',
    'string.empty': 'Postal code is required',
  }),

  country: Joi.string().min(3).max(30).trim().messages({
    'string.base': 'Country must be a string',
    'string.min': 'Country must be at least 3 characters long',
    'string.max': 'Country should be no longer than 30 characters',
    'string.empty': 'Country is required',
  }),

  shippingMethod: Joi.string()
    .valid('Odeon Express', 'Cipay Jet', 'Gorgom Express', 'Eunioa Fast')
    .messages({
      'string.base': 'Shipping method must be a string',
      'any.only':
        'Shipping method must be one of: Odeon Express, Cipay Jet, Gorgom Express, Eunioa Fast',
      'string.empty': 'Shipping method is required',
    }),

  paymentMethod: Joi.string().valid('Credit Card', 'PayPal').messages({
    'string.base': 'Payment method must be a string',
    'any.only': 'Payment method must be one of: Credit Card, PayPal',
    'string.empty': 'Payment method is required',
  }),

  promoCode: Joi.string().alphanum().min(3).max(30).trim().messages({
    'string.base': 'Promo code must be a string',
    'string.alphanum': 'Promo code must contain only letters and numbers',
    'string.min': 'Promo code must be at least 3 characters long',
    'string.max': 'Promo code should be no longer than 30 characters',
  }),
};

export const orderCreateSchema = Joi.object({
  ...baseOrderSchema,
  name: baseOrderSchema.name.required(),
  email: baseOrderSchema.email.required(),
  phone: baseOrderSchema.phone.required(),
  address: baseOrderSchema.address.required(),
  city: baseOrderSchema.city.required(),
  postalCode: baseOrderSchema.postalCode.required(),
  country: baseOrderSchema.country.required(),
  shippingMethod: baseOrderSchema.shippingMethod.required(),
  paymentMethod: baseOrderSchema.paymentMethod.required(),
});
