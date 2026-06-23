import { createUser as _createUser } from './user.service';

const createUser = async (req, res) => {
  try {
    await _createUser(req.body);
    res.redirect('/users');
  } catch (err) {
    res.send(err.message);
  }
};

export default { createUser };