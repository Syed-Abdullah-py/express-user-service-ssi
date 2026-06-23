import { create } from './user.model';

// REPOSITORY FOR CREATING USERS
const createUser = async (data) => {
  return await create(data);
};

// REPOSITORY FOR READING USERS
const getUsers = async () => {
  return await User.findAll();
};


export default { createUser, getUsers };