require('dotenv').config()
import db from "../models/index";
import bcrypt from "bcryptjs";
import { Op } from "sequelize";
import { getGroupWithRoles } from "./jwtService";
import { createJWT } from "../middleware/JWTActions";
const salt = bcrypt.genSaltSync(10);

const hashUserPassword = (password) => {
  return bcrypt.hashSync(password, salt);
};

const checkEmailExist = async (email) => {
  let user = await db.User.findOne({
    where: {
      email: email,
    },
  });
  if (user) {
    return true;
  }
  return false;
};
const checkPhoneExist = async (phone) => {
  let user = await db.User.findOne({
    where: {
      phone: phone,
    },
  });
  if (user) {
    return true;
  }
  return false;
};

const registerNewUser = async (data) => {
  try {
    //validate
    let isEmailExist = await checkEmailExist(data.email);
    if (isEmailExist === true) {
      return {
        EM: "The email is already exist",
        EC: -1,
      };
    }
    let isPhoneExist = await checkPhoneExist(data.phone);
    if (isPhoneExist === true) {
      return {
        EM: "The phone is already exist",
        EC: -1,
      };
    }

    // hash password
    let hashPassword = hashUserPassword(data.password);

    // create new user

    await db.User.create({
      email: data.email,
      username: data.userName,
      password: hashPassword,
      phone: data.phone,
      groupId: 4
    });
    return {
      EM: "A user is created success",
      EC: 0,
    };
  } catch (error) {
    console.log("check error", error);
    return {
      EM: "Something wrongs in services...",
      EC: -2,
    };
  }
};

const checkPassword = (password, hashPassword) => {
  return bcrypt.compareSync(password, hashPassword);
};

const handleUserLogin = async (data) => {
  try {
    let user = await db.User.findOne({
      where: {
        [Op.or]: [{ email: data.valueLogin }, { phone: data.valueLogin }],
      },
    });

    if (user) {
      let isCorrectPassword = checkPassword(data.password, user.password);

      if (isCorrectPassword === true) {

        let groupWithRoles = await getGroupWithRoles(user);
        let payload = {
          email: user.email,
          groupWithRoles,
          username: user.username,

        }
        let token = createJWT(payload);
        return {
          EM: "OK",
          EC: 0,
          DT: {
            access_token: token,
            groupWithRoles,
            email: user.email,
            username: user.username
          },
        };
      }
    }
    return {
      EM: "Your email/phone number or password is incorrect!",
      EC: -1,
      DT: "",
    };
  } catch (error) {
    console.log("check error", error);
    return {
      EM: "Something wrongs in services...",
      EC: -2,
    };
  }
};
module.exports = {
  registerNewUser,
  handleUserLogin,
  hashUserPassword,
  checkEmailExist,
  checkPhoneExist,
};
