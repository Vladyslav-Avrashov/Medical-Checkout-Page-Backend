import session from 'express-session';
import MongoStore from 'connect-mongo';
import { getEnvVar } from '../utils/getEnvVar.js';

const isProduction = process.env.NODE_ENV === 'production';

export const sessionMiddleware = session({
  secret: getEnvVar('SESSION_SECRET'),
  resave: false,
  saveUninitialized: true,
  name: 'connect.sid',

  store: MongoStore.create({
    mongoUrl: (() => {
      const user = getEnvVar('MONGODB_USER');
      const password = getEnvVar('MONGODB_PASSWORD');
      const url = getEnvVar('MONGODB_URL');
      const db = getEnvVar('MONGODB_DB');
      return `mongodb+srv://${user}:${password}@${url}/${db}?retryWrites=true&w=majority&appName=Cluster0`;
    })(),
    collectionName: 'sessions',
    ttl: 7 * 24 * 60 * 60,
    touchAfter: 24 * 3600,
    autoRemove: 'native',
  }),

  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7,
    secure: isProduction,
    sameSite: isProduction ? 'none' : 'lax',
    httpOnly: true,
    domain: undefined,
  },

  rolling: true,
  proxy: isProduction,
});
