import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { body } from 'express-validator';
import { BadRequestError } from '../errors/BadRequestError';
import { User } from '../models/user';
import validateRequest from '../middlewares/validate-request';

const router = express.Router();

router.post(
  '/api/users/signup',
  body('email').isEmail().withMessage('Email must be valid'),
  body('password')
    .isLength({ min: 5 })
    .trim()
    .withMessage('Password must be minimum of 5 characters'),
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    let existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new BadRequestError('Email in use');
    }

    const user = User.build({ email, password });
    await user.save();

    // Generate json web token
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
      },
      '1224'
    );

    // Store it on the session
    req.session = {
      jwt: token,
    };

    res.status(201).send(user);
  }
);

export { router as signupRouter };
