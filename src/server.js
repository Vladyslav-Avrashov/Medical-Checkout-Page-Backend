import express from 'express';
import cors from 'cors';
import cartRouter from './routers/cart.js';
import ordersRouter from './routers/orders.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { getEnvVar } from './utils/getEnvVar.js';
import { sessionMiddleware } from './middlewares/sessionMiddleware.js';
import { initCartMiddleware } from './middlewares/initCartMiddleware.js';

export const setupServer = () => {
  const app = express();

  if (process.env.NODE_ENV === 'production') {
    app.set('trust proxy', 1);
  }

  app.use(
    cors({
      origin: [
        'http://localhost:5173',
        'https://medical-checkout-page.vercel.app',
      ],
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
      exposedHeaders: ['Set-Cookie'],
    }),
  );
  app.use(express.json());

  app.use(sessionMiddleware);
  app.use(initCartMiddleware);

  app.use((req, res, next) => {
    if (req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Credentials', 'true');
      res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
      res.header(
        'Access-Control-Allow-Headers',
        'Content-Type, Authorization, Cookie',
      );
      return res.sendStatus(200);
    }
    next();
  });
  app.use('/cart', cartRouter);
  app.use('/orders', ordersRouter);

  app.use(errorHandler);

  app.get(notFoundHandler);

  const port = Number(getEnvVar('PORT', 3000));

  app.listen(port, () => console.log(`Server is running on port ${port}`));
};
