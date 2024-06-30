import { JwtPayload } from 'jsonwebtoken';
import { User } from '../user/user.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { Project } from './project.model';
import { TProject } from './project.interface';
import QueryBuilder from '../../builder/QueryBuilder';
import { ProjectSearchableFields } from './project.constant';

const createIntoDB = async (
  product: TProject,
  userData: JwtPayload,
) => {
  //* checking if the user is exist
  const user = await User.isUserExistsByUserEmail(userData?.email);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
  }

  //* checking if the user is already deleted
  const isDeleted = user?.isDeleted;
  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted !');
  }

  //* checking if the user is blocked
  const userStatus = user?.status;
  if (userStatus === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked ! !');
  }

  const addProduct = await Project.create(product);
  return addProduct;
};

const getAllIntoDB = async (query: Record<string, unknown>) => {
  const productQuery = new QueryBuilder(Project.find(), query)
    .search(ProjectSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await productQuery.modelQuery;
  const meta = await productQuery.countTotal();
  return {
    meta,
    result,
  };
};

const getAIntoDB = async (id: string, userData: JwtPayload) => {
  const user = await User.isUserExistsByUserEmail(userData.email);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
  }

  const result = await Project.findById(id).populate('seller');
  return result;
};

const updateIntoDB = async (
  id: string,
  payload: Partial<TProject>,
  userData: JwtPayload,
) => {
  const user = await User.isUserExistsByUserEmail(userData.email);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
  }

  //* checking if the user is already deleted
  const isDeleted = user?.isDeleted;
  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted !');
  }

  //* checking if the user is blocked
  const userStatus = user?.status;
  if (userStatus === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked ! !');
  }

  const product = await Project.findById(id);
  if (!product) {
    throw new AppError(httpStatus.NOT_FOUND, 'Product is not found!');
  }

  const result = await Project.findByIdAndUpdate(id, payload, {
    new: true,
  });
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Product is not updated!');
  }
  return result;
};

const deleteAIntoDB = async (id: string, userData: JwtPayload) => {
  const user = await User.isUserExistsByUserEmail(userData.email);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
  }

  //* checking if the user is already deleted
  const isDeleted = user?.isDeleted;
  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted !');
  }

  //* checking if the user is blocked
  const userStatus = user?.status;
  if (userStatus === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked ! !');
  }

  const product = await Project.findById(id);
  if (!product) {
    throw new AppError(httpStatus.NOT_FOUND, 'Product is not found!');
  }

  const result = await Project.findByIdAndDelete(id);
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Bike product not deleted!');
  }
  return result;
};

export const ProjectServices = {
  createIntoDB,
  getAllIntoDB,
  getAIntoDB,
  updateIntoDB,
  deleteAIntoDB,
};
