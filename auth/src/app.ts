import express, { Request, Response } from 'express';
import cookieSession from 'cookie-session';
import 'express-async-errors';

import { NotFoundError } from './errors/not-found-error';
import errorHandler from './middlewares/error-handler';
import { currentUserRouter } from './routes/current-user';
import { signInRouter } from './routes/signin';
import { signOutRouter } from './routes/signout';
import { signupRouter } from './routes/signup';

const app = express();
app.set('trust proxy', true);
app.use(express.json());
app.use(
  cookieSession({
    signed: false,
    // secure: true,
  })
);

app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Welcome to Auth Service' });
});

app.use(currentUserRouter);
app.use(signInRouter);
app.use(signupRouter);
app.use(signOutRouter);

app.all('*', async () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export default app;
