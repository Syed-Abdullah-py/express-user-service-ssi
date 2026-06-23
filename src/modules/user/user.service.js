import { createUser as _createUser } from './user.repository';

// CREATE USER SERVICE
const createUser = (data) => {
  return _createUser(data);
};

// READ USER SERVICE
const getUsers = () => {
  return repo.getUsers();
};


export default { createUser, getUsers };