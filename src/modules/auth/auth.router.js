import {Router} from 'express';
import * as authController from './auth.controller.js';
import { asyncHandler } from '../../utils/errorHandling.js';
import validation from '../../middleware/validation.js';
import { signInSchema, signUpSchema } from './auth.validation.js';
const router=Router();

router.post('/signUp',validation(signUpSchema),asyncHandler(authController.signUp))
router.post('/signIn',validation(signInSchema),asyncHandler(authController.signIn))
router.get('/confirmEmail/:token', asyncHandler(authController.confirmEmail));


export default router;