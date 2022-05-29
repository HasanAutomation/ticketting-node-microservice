import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { RequestValidationError } from '../errors/request-validation-error';

const router = express.Router();

router.post(
  '/api/users/signup',
  body('email').isEmail().withMessage('Email must be valid'),
  body('password')
    .isLength({ min: 5 })
    .trim()
    .withMessage('Password must be minimum of 5 characters'),
  (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) throw new RequestValidationError(errors.array());
    const { email, password } = req.body;
    res.send({ email, password });
  }
);

export { router as signupRouter };
