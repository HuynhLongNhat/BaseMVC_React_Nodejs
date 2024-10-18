// import axios from "axios";
import axios from "../setup/axios";

const registerNewUser = (data) => {
  return axios.post("/api/v1/register", data);
};

const LoginUser = (data) => {
  return axios.post("/api/v1/login", data);
};

const FetchAllUsers = (page, limit) => {
  return axios.get(
    `/api/v1/user/read?page=${page}&limit=${limit}`
  );
};

const deleteUser = (user) => {
  return axios.delete(`/api/v1/user/delete`, {
    data: {
      id: user.id,
    },
  });
};

const fetchGroup = () => {
  return axios.get("/api/v1/group/read");
};

const createNewUser = (data) => {
  return axios.post("/api/v1/user/create", { ...data });
};


const updateCurrentUser = (data) => {
  return axios.put("/api/v1/user/update", { ...data })
}

const getUserAccount = () => {
  return axios.get("/api/v1/account")
}

const logoutUser = () => {
  return axios.post("/api/v1/logout")
}


export {
  registerNewUser,
  LoginUser,
  FetchAllUsers,
  deleteUser,
  fetchGroup,
  createNewUser,
  updateCurrentUser,
  getUserAccount,
  logoutUser
};
