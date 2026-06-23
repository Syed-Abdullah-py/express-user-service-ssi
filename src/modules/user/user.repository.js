import User from './user.model.js';

export const createUser = (data) => User.create(data);

export const getUsers = () =>
  User.findAll({ order: [['createdAt', 'DESC']] });

export const getUserById = (id) => User.findByPk(id);

export const updateUser = async (id, data) => {
  const user = await User.findByPk(id);
  if (!user) return null;

  await user.update(data);
  return user;
};

export const deleteUser = async (id) => {
  const user = await User.findByPk(id);
  if (!user) return false;

  await user.destroy();
  return true;
};
