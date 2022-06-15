import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { BadRequestError } from '../errors/BadRequestError';
import validateRequest from '../middlewares/validate-request';
import { User } from '../models/user';
import { Password } from '../services/password';

import jwt from 'jsonwebtoken';

const router = express.Router();

router.post(
  '/api/users/signin',
  body('email').isEmail().withMessage('Please provide an email'),
  body('password')
    .isLength({ min: 4 })
    .withMessage('Please provide a password at least of 4 characters'),
  validateRequest,
  async (req: Request, res: Response) => {
    const existingUser = await User.findOne({ email: req.body.email });
    if (!existingUser) throw new BadRequestError('Invalid credentials');
    const passwordsMatch = await Password.compare(
      existingUser.password,
      req.body.password
    );
    if (!passwordsMatch) throw new BadRequestError('Invalid credentials');

    const token = jwt.sign(
      { id: existingUser.id, email: existingUser.email },
      '1224'
    );

    req.session = {
      jwt: token,
    };

    res.status(200).send(existingUser);
  }
);

export { router as signInRouter };
