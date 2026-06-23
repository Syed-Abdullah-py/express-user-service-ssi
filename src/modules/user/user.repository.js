import { create } from './user.model';

const createUser = async (data) => {
  return await create(data);
};

const getUsers = async () => {
  return await User.findAll();
};


export default { createUser, getUsers };