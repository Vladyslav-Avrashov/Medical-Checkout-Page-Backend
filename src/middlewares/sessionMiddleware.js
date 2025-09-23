import session from 'express-session';
import MongoStore from 'connect-mongo';
import { getEnvVar } from '../utils/getEnvVar.js';

export const sessionMiddleware = session({
  secret: getEnvVar('SESSION_SECRET'),
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: (() => {
      const user = getEnvVar('MONGODB_USER');
      const password = getEnvVar('MONGODB_PASSWORD');
      const url = getEnvVar('MONGODB_URL');
      const db = getEnvVar('MONGODB_DB');
      return `mongodb+srv://${user}:${password}@${url}/${db}?retryWrites=true&w=majority&appName=Cluster0`;
    })(),
    collectionName: 'sessions',
  }),
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7,
    secure: getEnvVar('NODE_ENV') === 'production',
    sameSite: getEnvVar('NODE_ENV') === 'production' ? 'none' : 'lax',
    httpOnly: true,
  },
});
