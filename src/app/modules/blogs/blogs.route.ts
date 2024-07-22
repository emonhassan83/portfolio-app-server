import express from 'express';
import zodValidationRequest from '../../middleware/validateRequest';
import { USER_ROLE } from '../user/user.constant';
import auth from '../../middleware/auth';
import { blogControllers } from './blogs.controller';
import { BlogValidations } from './blogs.validation';

const router = express.Router();

router.post(
  '/add-project',
  auth(USER_ROLE.admin),
  zodValidationRequest(BlogValidations.createBlogValidationSchema),
  blogControllers.addBlog,
);

router.put(
  '/published-blog',
  auth(USER_ROLE.admin),
  blogControllers.publishBlog,
);

router.put(
  '/update-project/:id',
  auth(USER_ROLE.admin),
  zodValidationRequest(BlogValidations.updateBlogValidationSchema),
  blogControllers.updateABlog,
);

router.get('/all-projects', blogControllers.getAllBlogs);

router.get('/:id', blogControllers.getABlog);

router.delete(
  '/delete-project/:id',
  auth(USER_ROLE.admin, USER_ROLE.user),
  blogControllers.deleteAQBlog,
);

export const BlogRoutes = router;
