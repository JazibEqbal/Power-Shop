const bcrypt = require("bcryptjs");

const users = [
  {
    name: "Admin",
    email: "jazib123@gmail.com",
    password: bcrypt.hashSync("adminJazib123", 10),
    isAdmin: true,
  },
  {
    name: "test1",
    email: "test1@gmail.com",
    password: bcrypt.hashSync("test1test1", 10),
  },
  {
    name: "test2",
    email: "test2@gmail.com",
    password: bcrypt.hashSync("test2test2", 10),
  },
];

module.exports = users;
