import React, { useState, useEffect } from "react";
import "./Register.scss";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { registerNewUser } from "../../service/UserService";
function Register(props) {
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const defaultValidInput = {
    isValidEmail: true,
    isValidUsername: true,
    isValidPassword: true,
    isValidConfirmPassword: true,
  };
  const [objCheckInput, setObjCheckInput] = useState(defaultValidInput);
  let navigate = useNavigate();
  const Register = async () => {
    let check = isValidInputs();
    if (check === true) {
      let serverData = await registerNewUser({
        email,
        userName,
        phone,
        password,
      });

      if (+serverData.EC === 0) {
        toast.success(serverData.EM);
        navigate("/login");
      } else {
        toast.error(serverData.EM);
      }
    }
  };
  const handleNavigationLogin = () => {
    navigate("/login");
  };
  useEffect(() => { }, []);
  const isValidInputs = () => {
    setObjCheckInput(defaultValidInput);
    if (!email) {
      toast.error("email is required !");
      setObjCheckInput({ ...defaultValidInput, isValidEmail: false });
      return false;
    }
    let regx = /^\S+@\S+\.\S+$/;
    if (!regx.test(email)) {
      setObjCheckInput({ ...defaultValidInput, isValidEmail: false });
      toast.error("Please enter a valid email address");
      return false;
    }
    if (!userName) {
      toast.error("username is required !");
      return false;
    }
    if (!password) {
      toast.error("password is required !");
      return false;
    }
    if (!phone) {
      toast.error("phone is required !");
      return false;
    }
    if (password !== confirmPassword) {
      toast.error("Your password is not the same!");
      return false;
    } else {
      return true;
    }
  };

  return (
    <div className="register-container ">
      <div className="container">
        <div className="row   px-3 px-sm-0">
          <div className="content-left d-none col-sm-7 d-sm-block">
            <div className="brand">Long Nhat</div>
            <div className="detail">Fullstack web developer....</div>
          </div>

          <div className="content-right col-12 col-sm-5  d-flex flex-column gap-3 py-3 ">
            <div className="brand  d-block d-sm-none ">Long Nhat</div>
            <div className="form-group">
              <input
                type="text"
                className={
                  objCheckInput.isValidEmail
                    ? "form-control"
                    : "form-control is-invalid"
                }
                placeholder="Email address"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                className={
                  objCheckInput.isValidUsername
                    ? "form-control"
                    : "form-control is-invalid"
                }
                placeholder="Phone number "
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                className={
                  objCheckInput.isValidUsername
                    ? "form-control"
                    : "form-control is-invalid"
                }
                placeholder="Username "
                value={userName}
                onChange={(event) => setUserName(event.target.value)}
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className={
                  objCheckInput.isValidPassword
                    ? "form-control"
                    : "form-control is-invalid"
                }
                placeholder="Password "
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                placeholder="Re-enter password"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
              />
            </div>
            <button className="btn btn-primary" onClick={() => Register()}>
              Register
            </button>

            <hr></hr>
            <div className="text-center">
              <button
                className="btn btn-success"
                onClick={() => handleNavigationLogin()}
              >
                Are ready your account ,Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Register;
