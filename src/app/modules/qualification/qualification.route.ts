import express from 'express';
import zodValidationRequest from '../../middleware/validateRequest';
import { USER_ROLE } from '../user/user.constant';
import auth from '../../middleware/auth';
import { QualificationValidations } from './qualification.validation';
import { qualificationControllers } from './qualification.controller';

const router = express.Router();

router.post(
  '/add-project',
  auth(USER_ROLE.admin),
  zodValidationRequest(QualificationValidations.createQualificationValidationSchema),
  qualificationControllers.addQualification,
);

router.put(
  '/update-project/:id',
  auth(USER_ROLE.admin),
  zodValidationRequest(QualificationValidations.createQualificationValidationSchema),
  qualificationControllers.updateAQualification,
);

router.get('/all-projects', qualificationControllers.getAllQualifications);

router.get('/:id', qualificationControllers.getAQualification);

router.delete(
  '/delete-project/:id',
  auth(USER_ROLE.admin, USER_ROLE.user),
  qualificationControllers.deleteAQualification,
);

export const SkillRoutes = router;
