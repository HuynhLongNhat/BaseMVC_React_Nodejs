import bcrypt from "bcryptjs";
import db from "../models/index.js";
//hash password
const salt = bcrypt.genSaltSync(10);

const hashUserPassword = (password) => {
  return bcrypt.hashSync(password, salt);
};

const createNewUser = async (email, password, username) => {
  //dung ORM SEQUELIZE_CLI
  let hashPassword = hashUserPassword(password);
  try {
    await db.User.create({
      username: username,
      email: email,
      password: hashPassword,
    });
  } catch (error) {
    console.log("Check error :", error);
  }
};

const getUserList = async () => {
  //relationships
  // let newUser = await db.User.findOne({
  //   where: {
  //     id: 1,
  //   },
  //   attributes: ["id", "username", "email"],
  //   include: { model: db.Group, attributes: ["name", "description"] },
  //   raw: true,
  //   nest: true,
  // });

  let users = [];
  users = await db.User.findAll();
  return users;
};
const deleteUser = async (id) => {
  await db.User.destroy({
    where: {
      id: id,
    },
  });
};

const getUserById = async (id) => {
  let user = {};
  user = await db.User.findOne({
    where: {
      id: id,
    },
  });
  return user;
};

const updateUserInfor = async (email, username, id) => {
  await db.User.update(
    {
      email: email,
      username: username,
    },
    {
      where: {
        id: id,
      },
    }
  );
};
module.exports = {
  createNewUser,
  getUserList,
  deleteUser,
  getUserById,
  updateUserInfor,
};
