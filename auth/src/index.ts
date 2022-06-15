import mongoose from 'mongoose';
import app from './app';

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
