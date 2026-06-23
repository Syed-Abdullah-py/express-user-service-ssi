import User from './user.model.js';

const createUser = async (data) => {
  return User.create(data);
};

const getUsers = async () => {
  return User.findAll({ order: [['createdAt', 'DESC']] });
};

const getUserById = async (id) => {
  return User.findByPk(id);
};

const updateUser = async (id, data) => {
  const user = await User.findByPk(id);
  if (!user) return null;

  await user.update(data);
  return user;
};

export default { createUser, getUsers, getUserById, updateUser };
