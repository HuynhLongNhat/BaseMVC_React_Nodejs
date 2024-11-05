import db from "../models/index";

const getGroup = async () => {
  try {
    let groups = await db.Group.findAll({
      order: [["name", "DESC"]],
    });
    if (groups) {
      return {
        EM: "Lấy danh sách các group thành công",
        EC: 0,
        DT: groups,
      };
    }
  } catch (error) {
    console.log("check error", error);
    return {
      EM: "Lỗi dịch vụ",
      EC: -1,
      DT: [],
    };
  }
};

module.exports = {
  getGroup,
};
