import { createUser as _createUser } from './user.repository';

const createUser = (data) => {
  return _createUser(data);
};

const getUsers = () => {
  return repo.getUsers();
};


export default { createUser, getUsers };