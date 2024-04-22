import {Router} from 'express';
import * as userController from './user.controller.js';
import auth from '../../middleware/auth.middleware.js';
import { asyncHandler } from '../../utils/errorHandling.js';
import fileUpload, { fileValidation } from '../../utils/multer.js';
const router=Router();

router.get('/profile',auth,asyncHandler(userController.viewProfile))
router.patch('/profilePic',auth,fileUpload(fileValidation.image).single('image'),asyncHandler(userController.uploadImage))
export default router;