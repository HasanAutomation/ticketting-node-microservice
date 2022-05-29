import express, { Request, Response } from 'express';

const router = express.Router();

router.post('/api/users/signout', (req: Request, res: Response) => {
  res.send('Hey There Signout');
});

export { router as signOutRouter };
