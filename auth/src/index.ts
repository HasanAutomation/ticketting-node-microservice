import express, { Request, Response } from 'express';
import cookieSession from 'cookie-session';
import 'express-async-errors';
import mongoose from 'mongoose';
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

const start = async () => {
  try {
    // await mongoose.connect('mongodb://auth-mongo-srv:27017/auth');
    await mongoose.connect(
      'mongodb+srv://hans1998:1998@hanscluster.t6mmknl.mongodb.net/auth?retryWrites=true&w=majority'
    );
    console.log('Connected to MongoDB');
    app.listen(3000, () => console.log(`Auth Service listenning on 3000`));
  } catch (err) {
    console.error(err);
  }
};

start();
