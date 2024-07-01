import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { AuthControllers } from './auth.controller';
import { AuthValidation } from './auth.validation';
import { USER_ROLE } from '../user/user.constant';
import auth from '../../middleware/auth';

const router = express.Router();

router.post(
  '/login',
  validateRequest(AuthValidation.loginValidationSchema),
  AuthControllers.loginUser,
);

router.post(
  '/change-password',
  auth(
    USER_ROLE.admin,
    USER_ROLE.user
  ),
  validateRequest(AuthValidation.changePasswordValidationSchema),
  AuthControllers.changePassword,
);

router.post(
  '/refresh-token',
  AuthControllers.refreshToken,
);

router.post(
  '/forget-password',
  validateRequest(AuthValidation.forgetPasswordValidationSchema),
  AuthControllers.forgetPassword,
);

router.post(
  '/reset-password',
  validateRequest(AuthValidation.forgetPasswordValidationSchema),
  AuthControllers.resetPassword,
);

export const AuthRoutes = router;