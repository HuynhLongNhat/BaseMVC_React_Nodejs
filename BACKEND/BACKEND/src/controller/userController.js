import userApiService from "../service/userApiService";

const readFunc = async (req, res) => {
  console.log("data get all users  :", req.body);
  try {
    if (req.query.page && req.query.limit) {
      let page = req.query.page;
      let limit = req.query.limit;

      let data = await userApiService.getUserWithPagination(+page, +limit);
      return res.status(200).json({
        EM: data.EM,
        EC: data.EC,
        DT: data.DT,
      });
    } else {
      let data = await userApiService.getAllUser();
      return res.status(200).json({
        EM: data.EM,
        EC: data.EC,
        DT: data.DT,
      });
    }
  } catch (error) {
    console.log("check error", error);
    return res.status(404).json({
      EM: "Lỗi hệ thống",
      EC: "-1",
      DT: "",
    });
  }
};
const createFunc = async (req, res) => {
  console.log("data create new user  :", req.body);
  try {
    let data = await userApiService.createNewUser(req.body);

    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
    });
  } catch (error) {
    console.log("check error", error);
    return res.status(404).json({
      EM: "Lỗi hệ thống",
      EC: "-1",
      DT: "",
    });
  }
};
const updateFunc = async (req, res) => {
  console.log("data update user  :", req.body);
  try {
    let data = await userApiService.updateUser(req.body);

    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
    });
  } catch (error) {
    console.log("check error", error);
    return res.status(404).json({
      EM: "Lỗi hệ thống",
      EC: "-1",
      DT: "",
    });
  }
};
const deleteFunc = async (req, res) => {
  console.log("data delete user  :", req.body);
  try {
    let data = await userApiService.deleteUser(req.body.id);
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
    });
  } catch (error) {
    console.log("check error", error);
    return res.status(404).json({
      EM: "Lỗi hệ thống",
      EC: "-1",
      DT: "",
    });
  }
};

const getUserAccount = async (req, res) => {
  return res.status(200).json({
    EM: "Ok",
    EC: 0,
    DT: {
      access_token: req.token,
      groupWithRoles: req.user.groupWithRoles,
      email: req.user.email,
      username: req.user.username,
    },
  });
};

module.exports = {
  readFunc,
  createFunc,
  updateFunc,
  deleteFunc,
  getUserAccount,
};
