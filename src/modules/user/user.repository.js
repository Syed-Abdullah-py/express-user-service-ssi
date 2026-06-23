import { create } from './user.model';

const createUser = async (data) => {
  return await create(data);
};

export default { createUser };