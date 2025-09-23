import express from 'express';
import cors from 'cors';
import cartRouter from './routers/cart.js';
import ordersRouter from './routers/orders.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { getEnvVar } from './utils/getEnvVar.js';
import { sessionMiddleware } from './middlewares/sessionMiddleware.js';
import { initCartMiddleware } from './middlewares/initCartMiddleware.js';
import { ALLOWED_ORIGINS } from './constants/origins.js';

export const setupServer = () => {
  const app = express();

  app.use(
    cors({
      origin: (origin, callback) => {
        if (ALLOWED_ORIGINS.includes(origin) || !origin) {
          callback(null, true);
        } else {
          callback(new Error('Not allowed by CORS'));
        }
      },
      credentials: true,
    }),
  );
  app.use(express.json());
  app.use(sessionMiddleware);
  app.use(initCartMiddleware);

  app.use('/cart', cartRouter);
  app.use('/orders', ordersRouter);

  app.use(errorHandler);

  app.get(notFoundHandler);

  const port = Number(getEnvVar('PORT', 3000));

  app.listen(port, () => console.log(`Server is running on port ${port}`));
};
