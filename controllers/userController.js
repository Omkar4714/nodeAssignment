const { v4: uuidv4 } = require('uuid');

let users = [];
class User {
  constructor(id, username, age, hobbies) {
    this.id = id;
    this.username = username;
    this.age = age;
    this.hobbies = hobbies;
  }
}

const getUsers = (req, res) => {
  res.json(users);
};

const getUserById = (req, res) => {
  const { userId } = req.params;
  const user = users.find((user) => user.id === userId);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  res.json(user);
};

const createUser = (req, res) => {
  const { username, age, hobbies } = req.body;
  if (!username || !age) {
    return res.status(400).json({ message: 'Username and age are required' });
  }
  const newUser = new User(uuidv4(), username, age, hobbies || []);
  users.push(newUser);
  res.status(201).json(newUser);
};

const updateUser = (req, res) => {
  const { userId } = req.params;
  const { username, age, hobbies } = req.body;
  const userIndex = users.findIndex((user) => user.id === userId);
  if (userIndex === -1) {
    return res.status(404).json({ message: 'User not found' });
  }
  users[userIndex] = { ...users[userIndex], username, age, hobbies };
  res.json(users[userIndex]);
};

const deleteUser = (req, res) => {
  const { userId } = req.params;
  const userIndex = users.findIndex((user) => user.id === userId);
  if (userIndex === -1) {
    return res.status(404).json({ message: 'User not found' });
  }
  const deletedUser = users.splice(userIndex, 1);
  res.json({ message: 'User deleted', deletedUser });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
