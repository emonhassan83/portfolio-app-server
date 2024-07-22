import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { BlogServices } from './blogs.service';

const addBlog = catchAsync(async (req, res) => {
  const blog = await BlogServices.createIntoDB(req.body, req.user);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'New blog added successfully!',
    data: blog,
  });
});

const publishBlog = catchAsync(async (req, res) => {
  const project = await BlogServices.publishedBlog(req.body, req.user);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'New blog published successfully!',
    data: project,
  });
});

const getAllBlogs = catchAsync(async (req, res) => {
  const result = await BlogServices.getAllIntoDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All blogs retrieve successfully!',
    meta: result.meta,
    data: result.result,
  });
});

const getABlog = catchAsync(async (req, res) => {
  const { id } = req.params;
  const project = await BlogServices.getAIntoDB(id, req.user);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Blog retrieve successfully!',
    data: project,
  });
});

const updateABlog = catchAsync(async (req, res) => {
  const { id } = req.params;
  const project = await BlogServices.updateIntoDB(id, req.body, req.user);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Update a blog successfully!',
    data: project,
  });
});

const deleteAQBlog = catchAsync(async (req, res) => {
  const { id } = req.params;
  const project = await BlogServices.deleteAIntoDB(id, req.user);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Delete a blog successfully!',
    data: project,
  });
});

export const blogControllers = {
  addBlog,
  publishBlog,
  getAllBlogs,
  getABlog,
  updateABlog,
  deleteAQBlog,
};
