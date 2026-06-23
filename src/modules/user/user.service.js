import userRepository from './user.repository.js';

const UUID_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

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

const validateId = (id) => {
  if (!id || !UUID_REGEX.test(id)) {
    const error = new Error('Invalid user ID');
    error.statusCode = 400;
    throw error;
  }
};

const handleUniqueError = (err) => {
  if (err.name === 'SequelizeUniqueConstraintError') {
    const error = new Error('A user with this email already exists');
    error.statusCode = 409;
    throw error;
  }
  throw err;
};

const createUser = async (data) => {
  const validated = validateUserInput(data);

  try {
    return await userRepository.createUser(validated);
  } catch (err) {
    handleUniqueError(err);
  }
};

const getUsers = async () => {
  return userRepository.getUsers();
};

const getUserById = async (id) => {
  validateId(id);

  const user = await userRepository.getUserById(id);

  if (!user) {
    const error = new Error('User not found');
    error.statusCode = 404;
    throw error;
  }

  return user;
};

const updateUser = async (id, data) => {
  validateId(id);
  const validated = validateUserInput(data);

  try {
    const user = await userRepository.updateUser(id, validated);

    if (!user) {
      const error = new Error('User not found');
      error.statusCode = 404;
      throw error;
    }

    return user;
  } catch (err) {
    handleUniqueError(err);
  }
};

export default { createUser, getUsers, getUserById, updateUser };
