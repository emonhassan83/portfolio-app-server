import express from 'express';
import zodValidationRequest from '../../middleware/validateRequest';
import { USER_ROLE } from '../user/user.constant';
import auth from '../../middleware/auth';
import { skillValidations } from './skills.validation';
import { skillControllers } from './skills.controller';

const router = express.Router();

router.post(
  '/add-project',
  auth(USER_ROLE.admin),
  zodValidationRequest(skillValidations.createSkillValidationSchema),
  skillControllers.addSkill,
);

router.put(
  '/update-project/:id',
  auth(USER_ROLE.admin),
  zodValidationRequest(skillValidations.updateSkillValidationSchema),
  skillControllers.updateASkill,
);

router.get('/all-projects', skillControllers.getAllSkills);

router.get('/:id', skillControllers.getASkill);

router.delete(
  '/delete-project/:id',
  auth(USER_ROLE.admin, USER_ROLE.user),
  skillControllers.deleteASkill,
);

export const SkillRoutes = router;
