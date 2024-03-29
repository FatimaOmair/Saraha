import {Router} from 'express';
import * as userController from './user.controller.js';
import auth from '../../middleware/auth.middleware.js';
import { asyncHandler } from '../../utils/errorHandling.js';
const router=Router();

router.get('/profile',auth,asyncHandler(userController.viewProfile))
export default router;