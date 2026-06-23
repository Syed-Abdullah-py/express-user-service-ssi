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

export default { createUser, getUsers, getUserById };
