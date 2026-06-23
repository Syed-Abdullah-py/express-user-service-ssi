import { createUser as _createUser } from './user.repository';

const createUser = (data) => {
  return _createUser(data);
};

export default { createUser };