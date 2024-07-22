import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { SkillServices } from './skills.service';

const addSkill = catchAsync(async (req, res) => {
  const project = await SkillServices.createIntoDB(req.body, req.user);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'New skill added successfully!',
    data: project,
  });
});

const getAllSkills = catchAsync(async (req, res) => {
  const result = await SkillServices.getAllIntoDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All skills retrieve successfully!',
    meta: result.meta,
    data: result.result,
  });
});

const getASkill = catchAsync(async (req, res) => {
  const { id } = req.params;
  const project = await SkillServices.getAIntoDB(id, req.user);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Skill retrieve successfully!',
    data: project,
  });
});

const updateASkill = catchAsync(async (req, res) => {
  const { id } = req.params;
  const project = await SkillServices.updateIntoDB(id, req.body, req.user);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Update a skill successfully!',
    data: project,
  });
});

const deleteASkill = catchAsync(async (req, res) => {
  const { id } = req.params;
  const project = await SkillServices.deleteAIntoDB(id, req.user);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Delete a skill successfully!',
    data: project,
  });
});

export const skillControllers = {
  addSkill,
  getAllSkills,
  getASkill,
  updateASkill,
  deleteASkill,
};
