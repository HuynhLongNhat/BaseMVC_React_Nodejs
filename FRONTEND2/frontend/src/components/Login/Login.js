import React, { useEffect, useState, useContext } from "react";
import "./Login.scss";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { LoginUser } from "../../service/UserService";
import { UserContext } from "../../context/userProvider";

function Login(props) {

  const { loginContext } = useContext(UserContext)

  let navigate = useNavigate();

  const [valueLogin, setValueLogin] = useState();
  const [password, setPassword] = useState();
  const defaultValidInput = {
    isValidValueLogin: true,
    isValidPassword: true,
  };
  const [objCheckInput, setObjCheckInput] = useState(defaultValidInput);
  const handleCreateNewAccount = () => {
    navigate("/register");
  };
  const checkInvalidInput = () => {
    setObjCheckInput(defaultValidInput);
    if (!valueLogin) {
      toast.error("Please enter your email address or phone number!");

      setObjCheckInput({ ...defaultValidInput, isValidValueLogin: false });
      return false;
    }
    if (!password) {
      toast.error("Please enter your password!");
      setObjCheckInput({ ...defaultValidInput, isValidPassword: false });
      return false;
    }
    return true;
  };

  const handleLogin = async () => {
    let check = checkInvalidInput();
    if (check === true) {
      let res = await LoginUser({
        valueLogin,
        password,
      });
      if (res && +res.EC === 0) {
        //khi người dùng đăng nhập thành công thì sẽ khởi tạo 1 token
        let groupWithRoles = res.DT.groupWithRoles;
        let email = res.DT.email;
        let username = res.DT.username;
        let token = res.DT.access_token;
        let data = {
          isAuthenticated: true,
          token,
          account: { groupWithRoles, email, username }
        };

        localStorage.setItem('jwt', token)
        loginContext(data)
        //  toast.success(res.EM);
        navigate("/users");

        // redux
      }
      if (res && +res.EC !== 0) {
        toast.error(res.EM);
      }
    }
  };
  const handlePressEnter = (event) => {
    if (event.charCode === 13 && event.code === "Enter") {
      handleLogin();
    }
  };

  return (
    <div className="login-container ">
      <div className="container">
        <div className="row  px-3 px-sm-0">
          <div className="content-left d-none col-sm-7 d-sm-block">
            <div className="brand">Long Nhat</div>
            <div className="detail">Fullstack web developer....</div>
          </div>

          <div className="content-right col-12 col-sm-5  d-flex flex-column gap-3 py-3 ">
            <div className="brand  d-block d-sm-none ">Long Nhat</div>

            <input
              type="text"
              className={
                objCheckInput.isValidValueLogin
                  ? "form-control"
                  : "form-control is-invalid"
              }
              placeholder="Email address or phone number"
              value={valueLogin}
              onChange={(event) => setValueLogin(event.target.value)}
            />
            <input
              type="password"
              className={
                objCheckInput.isValidPassword
                  ? "form-control"
                  : "form-control is-invalid"
              }
              placeholder="Password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              onKeyPress={(event) => handlePressEnter(event)}
            />
            <button className="btn btn-primary" onClick={() => handleLogin()}>
              Login
            </button>
            <span className="text-center ">
              <a className="forgot-password" href="#">
                Forgot your password ?
              </a>
            </span>
            <hr></hr>
            <div className="text-center">
              <button
                className="btn btn-success"
                onClick={() => handleCreateNewAccount()}
              >
                Create new account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
