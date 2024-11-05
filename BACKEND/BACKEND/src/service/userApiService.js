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
        EM: "Lấy dữ liệu thành công",
        EC: 0,
        DT: users,
      };
    } else {
      return {
        EM: "Lấy dữ liệu không thành công",
        EC: 0,
        DT: [],
      };
    }
  } catch (error) {
    console.logy("check error", error);
    return {
      EM: "Lỗi dịch vụ",
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
      EM: "Lỗi hệ thống",
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
        EM: "Email này đã tồn tại trong hệ thống",
        EC: -1,
        DT: "email",
      };
    }
    let isPhoneExist = await checkPhoneExist(data.phone);
    if (isPhoneExist === true) {
      return {
        EM: "Số điện thoại này đã tồn tại trong hệ thống",
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
        EM: "Tạo người dùng mới thành công",
        EC: 0,
        DT: [],
      };
    }
  } catch (error) {
    console.log("check error :", error);
    return {
      EM: "Lỗi hệ thống",
      EC: -1,
      DT: "",
    };
  }
};
const updateUser = async (data) => {
  try {
    if (!data.groupId) {
      return {
        EM: "Lỗi với GroupId trống ",
        EC: 1,
        DT: "group",
      };
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
        groupId: data.groupId,
      });
      return {
        EM: "Cập nhật người dùng thành công",
        EC: 0,
        DT: "",
      };
    } else {
      //not found
      return {
        EM: "Không tìm thấy người dùng ",
        EC: 2,
        DT: "",
      };
    }
  } catch (error) {
    console.log("check error :", error);
    return {
      EM: "Lỗi dịch vụ ",
      EC: 1,
      DT: [],
    };
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
        EM: "Xóa người dùng thành công",
        EC: 0,
        DT: user,
      };
    } else {
      return {
        EM: "Người dùng không tồn tại",
        EC: 2,
        DT: [],
      };
    }
  } catch (error) {
    console.log("check error : ", error);
    return {
      EM: "Lỗi dịch vụ",
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
