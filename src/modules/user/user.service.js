import userRepository from './user.repository.js';

const validateUserInput = (data) => {
  const name = data.name?.trim();
  const email = data.email?.trim();

  if (!name || !email) {
    const error = new Error('Name and email are required');
    error.statusCode = 400;
    throw error;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    const error = new Error('Please enter a valid email address');
    error.statusCode = 400;
    throw error;
  }

  return { name, email };
};

const createUser = async (data) => {
  const validated = validateUserInput(data);

  try {
    return await userRepository.createUser(validated);
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      const error = new Error('A user with this email already exists');
      error.statusCode = 409;
      throw error;
    }
    throw err;
  }
};

const getUsers = async () => {
  return userRepository.getUsers();
};

const getUserById = async (id) => {
  const user = await userRepository.getUserById(id);

  if (!user) {
    const error = new Error('User not found');
    error.statusCode = 404;
    throw error;
  }

  return user;
};

export default { createUser, getUsers, getUserById };
