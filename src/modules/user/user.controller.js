import userService from './user.service.js';

const createUser = async (req, res) => {
  try {
    await userService.createUser(req.body);
    res.redirect('/users.html?created=1');
  } catch (err) {
    const message = encodeURIComponent(err.message);
    res.redirect(`/?error=${message}`);
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await userService.getUsers();
    res.json(users);
  } catch (err) {
    res.status(err.statusCode || 500).json({ error: err.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.id);
    res.json(user);
  } catch (err) {
    res.status(err.statusCode || 500).json({ error: err.message });
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;

  try {
    await userService.updateUser(id, req.body);
    res.redirect(`/user.html?id=${id}&updated=1`);
  } catch (err) {
    const message = encodeURIComponent(err.message);
    res.redirect(`/edit.html?id=${id}&error=${message}`);
  }
};

export default { createUser, getUsers, getUserById, updateUser };
