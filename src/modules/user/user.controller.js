import * as userService from './user.service.js';

const redirectWithError = (res, path, message) => {
  res.redirect(`${path}?error=${encodeURIComponent(message)}`);
};

const sendJsonError = (res, err) => {
  res.status(err.statusCode || 500).json({ error: err.message });
};

export const createUser = async (req, res) => {
  try {
    await userService.createUser(req.body);
    res.redirect('/users.html?created=1');
  } catch (err) {
    redirectWithError(res, '/', err.message);
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await userService.getUsers();
    res.json(users);
  } catch (err) {
    sendJsonError(res, err);
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.id);
    res.json(user);
  } catch (err) {
    sendJsonError(res, err);
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;

  try {
    await userService.updateUser(id, req.body);
    res.redirect(`/user.html?id=${id}&updated=1`);
  } catch (err) {
    redirectWithError(res, `/edit.html?id=${id}`, err.message);
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    await userService.deleteUser(id);
    res.redirect('/users.html?deleted=1');
  } catch (err) {
    redirectWithError(res, `/user.html?id=${id}`, err.message);
  }
};
