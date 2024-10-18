import groupService from "../service/groupService";
const readFunc = async (req, res) => {
  try {
    let data = await groupService.getGroup();
    if (data) {
      return res.status(200).json({
        EM: data.EM,
        EC: data.EC,
        DT: data.DT,
      });
    }
  } catch (error) {
    console.log("check error");
    return res.status(404).json({
      EM: "Error from server",
      EC: "-1",
      DT: "",
    });
  }
};

module.exports = {
  readFunc,
};
