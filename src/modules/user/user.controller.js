import { createUser as _createUser } from './user.service';


// CONTROLLER TO CREATE A USER
const createUser = async (req, res) => {
  try {
    await _createUser(req.body);
    res.redirect('/users');
  } catch (err) {
    res.send(err.message);
  }
};

// CONTROLLER TO FETCH USERS
const getUsers = async (req, res) => {
  try {
    const users = await service.getUsers();

    let html = `
      <h2>Users List</h2>
      <a href="/">Create New User</a>
    `;

    users.forEach(user => {
      html += `
        <p>
          ${user.name} - ${user.email}

          <a href="/users/edit/${user.id}">Edit</a>

          <form action="/users/${user.id}?_method=DELETE" method="POST" style="display:inline;">
            <button type="submit">Delete</button>
          </form>
        </p>
      `;
    });

    res.send(html);
  } catch (err) {
    res.send(err.message);
  }
};

export default { createUser, getUsers };