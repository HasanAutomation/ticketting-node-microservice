import express, { Request, Response } from 'express';

const router = express.Router();

router.post('/api/users/signin', (req: Request, res: Response) => {
  res.send('Hey There Signin');
});

export { router as signInRouter };
