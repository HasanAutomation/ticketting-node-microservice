import express, { Request, Response } from 'express'

const app = express();
app.use(express.json())

app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Welcome to Auth Service' });
})

app.listen(3000, () => console.log(`Auth Service listenning on 3000`))