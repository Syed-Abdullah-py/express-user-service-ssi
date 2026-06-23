import { AppError } from '../../utils/AppError.js';
import { validateUuid, validateUserInput } from '../../utils/validators.js';
import * as userRepository from './user.repository.js';

const handleDatabaseError = (err) => {
  if (err.name === 'SequelizeUniqueConstraintError') {
    throw new AppError('A user with this email already exists', 409);
  }
  throw err;
};

export const createUser = async (data) => {
  const validated = validateUserInput(data);

  try {
    return await userRepository.createUser(validated);
  } catch (err) {
    handleDatabaseError(err);
  }
};

export const getUsers = () => userRepository.getUsers();

export const getUserById = async (id) => {
  validateUuid(id);

  const user = await userRepository.getUserById(id);
  if (!user) throw new AppError('User not found', 404);

  return user;
};

export const updateUser = async (id, data) => {
  validateUuid(id);
  const validated = validateUserInput(data);

  try {
    const user = await userRepository.updateUser(id, validated);
    if (!user) throw new AppError('User not found', 404);

    return user;
  } catch (err) {
    handleDatabaseError(err);
  }
};

export const deleteUser = async (id) => {
  validateUuid(id);

  const deleted = await userRepository.deleteUser(id);
  if (!deleted) throw new AppError('User not found', 404);
};
