import express, { Request, Response } from 'express';
import { NotFoundError } from './errors/not-found-error';
import errorHandler from './middlewares/error-handler';
import { currentUserRouter } from './routes/current-user';
import { signInRouter } from './routes/signin';
import { signOutRouter } from './routes/signout';
import { signupRouter } from './routes/signup';

const app = express();
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Welcome to Auth Service' });
});

app.use(currentUserRouter);
app.use(signInRouter);
app.use(signupRouter);
app.use(signOutRouter);

app.all('*', () => {
  throw new NotFoundError();
});

app.use(errorHandler);

app.listen(3000, () => console.log(`Auth Service listenning on 3000`));
