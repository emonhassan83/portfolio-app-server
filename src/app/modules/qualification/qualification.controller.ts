import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { QualificationServices } from './qualification.service';

const addQualification = catchAsync(async (req, res) => {
  const project = await QualificationServices.createIntoDB(req.body, req.user);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'New qualification added successfully!',
    data: project,
  });
});

const getAllQualifications = catchAsync(async (req, res) => {
  const result = await QualificationServices.getAllIntoDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All qualifications retrieve successfully!',
    meta: result.meta,
    data: result.result,
  });
});

const getAQualification = catchAsync(async (req, res) => {
  const { id } = req.params;
  const project = await QualificationServices.getAIntoDB(id, req.user);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Qualification retrieve successfully!',
    data: project,
  });
});

const updateAQualification = catchAsync(async (req, res) => {
  const { id } = req.params;
  const project = await QualificationServices.updateIntoDB(id, req.body, req.user);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Update a qualification successfully!',
    data: project,
  });
});

const deleteAQualification = catchAsync(async (req, res) => {
  const { id } = req.params;
  const project = await QualificationServices.deleteAIntoDB(id, req.user);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Delete a qualification successfully!',
    data: project,
  });
});

export const qualificationControllers = {
  addQualification,
  getAllQualifications,
  getAQualification,
  updateAQualification,
  deleteAQualification,
};
