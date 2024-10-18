import db from "../models/index";
import {
  checkEmailExist,
  checkPhoneExist,
  hashUserPassword,
} from "../service/apiService";
const getAllUser = async () => {
  try {
    let users = await db.User.findAll({
      attributes: ["id", "username", "email", "phone", "sex"],
      include: { model: db.Group, attributes: ["name", "description"] },
    });

    if (users) {
      return {
        EM: "Get data success",
        EC: 0,
        DT: users,
      };
    } else {
      return {
        EM: "Get data success",
        EC: 0,
        DT: [],
      };
    }
  } catch (error) {
    console.logy("check error", error);
    return {
      EM: "Something wrong with service",
      EC: 1,
      DT: [],
    };
  }
};

const getUserWithPagination = async (page, limit) => {
  try {
    let offSet = (page - 1) * limit;
    const { count, rows } = await db.User.findAndCountAll({
      offSet: offSet,
      limit: limit,
      attributes: ["id", "username", "email", "phone", "sex", "address"],
      include: { model: db.Group, attributes: ["name", "description", "id"] },
      order: [["id", "DESC"]],
    });
    let totalPage = Math.ceil(count / limit);
    let data = {
      totalRows: count,
      totalPages: totalPage,
      users: rows,
    };

    return {
      EM: " fetch Ok",
      EC: 0,
      DT: data,
    };
  } catch (error) {
    console.log("check error", error);
    return {
      EM: "Error from server",
      EC: -1,
      DT: "",
    };
  }
};
const createNewUser = async (data) => {
  try {
    //validate
    let isEmailExist = await checkEmailExist(data.email);
    if (isEmailExist === true) {
      return {
        EM: "The email is already exist",
        EC: -1,
        DT: "email",
      };
    }
    let isPhoneExist = await checkPhoneExist(data.phone);
    if (isPhoneExist === true) {
      return {
        EM: "The phone is already exist",
        EC: -1,
        DT: "phone",
      };
    }

    // hash password
    let hashPassword = hashUserPassword(data.password);

    let user = await db.User.create({
      username: data.username,
      password: hashPassword,
      phone: data.phone,
      email: data.email,
      address: data.address,
      sex: data.sex,
      groupId: data.groupId,
    });
    if (user) {
      return {
        EM: " create new user success!",
        EC: 0,
        DT: [],
      };
    }
  } catch (error) {
    console.log("check error :", error);
    return {
      EM: "Error from server",
      EC: -1,
      DT: "",
    };
  }
};
const updateUser = async (data) => {
  try {
    if (!data.groupId) {
      return {
        EM: 'Error with empty GroupId ',
        EC: 1,
        DT: "group"
      }

    }
    let user = await db.User.findOne({
      where: {
        id: data.id,
      },
    });
    if (user) {
      //update
      await user.update({
        username: data.username,
        address: data.address,
        sex: data.sex,
        groupId: data.groupId
      });
      return {
        EM: 'Update user succeeds',
        EC: 0,
        DT: ""
      }
    } else {
      //not found
      return {
        EM: 'User not found! ',
        EC: 2,
        DT: ""
      }
    }
  } catch (error) {
    console.log("check error :", error);
    return {
      EM: 'Something wrongs with services ',
      EC: 1,
      DT: []
    }
  }
};

const deleteUser = async (id) => {
  try {
    let user = await db.User.findOne({
      where: { id: id },
    });

    if (user) {
      await user.destroy();
      return {
        EM: "Delete user success",
        EC: 0,
        DT: user,
      };
    } else {
      return {
        EM: "User not exist",
        EC: 2,
        DT: [],
      };
    }
  } catch (error) {
    console.log("check error : ", error);
    return {
      EM: "Error from service",
      EC: -1,
      DT: [],
    };
  }
};

module.exports = {
  getUserWithPagination,
  getAllUser,
  createNewUser,
  updateUser,
  deleteUser,
};