/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import {
  fetchGroup,
  createNewUser,
  updateCurrentUser,
} from "../../service/UserService";
import { toast } from "react-toastify";
import _ from "lodash";

function ModalUser(props) {
  const { action, dataModalEdit } = props;
  const [userGroup, setUserGroup] = useState([]);
  const listGender = ["Male", "Female", "Other"];

  const defaultUserData = {
    email: "",
    phone: "",
    username: "",
    password: "",
    address: "",
    sex: listGender[0],
    group: "",
  };
  const [userData, setUserData] = useState(defaultUserData);
  const validInputDefault = {
    email: true,
    phone: true,
    username: true,
    password: true,
    address: true,
    sex: true,
    group: true,
  };
  const [validInputs, setValidInputs] = useState(validInputDefault);

  useEffect(() => {
    getGroups();
  }, []);

  useEffect(() => {
    if (action === "UPDATE") {
      setUserData({
        ...dataModalEdit,
        group: dataModalEdit.Group ? dataModalEdit.Group.id : "",
      });
    }
  }, [dataModalEdit]);

  useEffect(() => {
    if (action === "CREATE") {
      if (userGroup && userGroup.length > 0)
        setUserData({
          ...userData,
          group: userGroup[0].id,
        });
    }
  }, [action]);

  const getGroups = async () => {
    let res = await fetchGroup();
    if (res && res && res.EC === 0) {
      setUserGroup(res.DT);

      if (res.DT && res.DT.length > 0) {
        let groups = res.DT;

        setUserData({ ...userData, group: groups[0].id });
      }
    } else {
      toast.error(res?.EM);
    }
  };

  const handleOnchangeInput = (value, name) => {
    //  _.cloneDeep copy lai bien userData
    let _userData = _.cloneDeep(userData);
    _userData[name] = value;
    setUserData(_userData);
  };
  const checkValidate = () => {
    if (action === "UPDATE") {
      return true;
    }
    // create user
    setValidInputs(validInputDefault);
    let array = [
      "email",
      "phone",
      "username",
      "password",
      "address",
      "sex",
      "group",
    ];
    let check = true;
    for (let i = 0; i < array.length; i++) {
      if (!userData[array[i]]) {
        let _validInputs = _.cloneDeep(validInputDefault);
        _validInputs[array[i]] = false;
        setValidInputs(_validInputs);

        toast.error(`Empty input ${array[i]}`);
        check = false;
        break;
      }
    }
    return check;
  };
  const handleConfirmUser = async () => {
    let check = checkValidate();
    if (check === true) {
      let res =
        action === "CREATE"
          ? await createNewUser({
              ...userData,
              groupId: userData["group"],
            })
          : await updateCurrentUser({
              ...userData,
              groupId: userData["group"],
            });
      if (res && res.EC === 0) {
        setUserData({
          ...defaultUserData,
          group: userGroup && userGroup.length > 0 ? userGroup[0].id : "",
        });
        toast.success(res?.EM);
        props.toggleShowModalUser();
        props.fetchUser();
      }
      if (res && res.EC !== 0) {
        toast.error(res?.EM);
        let _validInputs = _.cloneDeep(validInputDefault);
        _validInputs[res.DT] = false;
        setValidInputs(_validInputs);
      }
    }
  };
  const handleCloseModalUser = () => {
    props.toggleShowModalUser();
    setUserData(defaultUserData);
    setValidInputs(validInputDefault);
  };
  return (
    <div>
      <Modal size="lg" show={props.show} className="modal-user">
        <Modal.Header closeButton onHide={() => handleCloseModalUser()}>
          <Modal.Title>
            {action === "CREATE" ? "Create new user" : "Edit a user"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="content-body row">
            <div className="col-12 col-sm-6 form-group">
              <label>
                Email address <span className="text-danger">(*)</span>
              </label>
              <input
                disabled={action === "CREATE" ? false : true}
                className={
                  validInputs.email ? "form-control" : "form-control is-invalid"
                }
                type="email"
                value={userData.email}
                onChange={(event) =>
                  handleOnchangeInput(event.target.value, "email")
                }
              ></input>
            </div>
            <div className="col-12 col-sm-6 form-group">
              <label>
                Phone number <span className="text-danger">(*)</span>
              </label>
              <input
                disabled={action === "CREATE" ? false : true}
                className={
                  validInputs.phone ? "form-control" : "form-control is-invalid"
                }
                type="text"
                value={userData.phone}
                onChange={(event) =>
                  handleOnchangeInput(event.target.value, "phone")
                }
              ></input>
            </div>
            <div className="col-12 col-sm-6 form-group">
              <label>User name</label>
              <input
                className={
                  validInputs.username
                    ? "form-control"
                    : "form-control is-invalid"
                }
                type="text"
                value={userData.username}
                onChange={(event) =>
                  handleOnchangeInput(event.target.value, "username")
                }
              ></input>
            </div>
            <div className="col-12 col-sm-6 form-group">
              {action === "CREATE" && (
                <>
                  <label>
                    Password <span className="text-danger">(*)</span>
                  </label>
                  <input
                    className={
                      validInputs.password
                        ? "form-control"
                        : "form-control is-invalid"
                    }
                    type="password"
                    value={userData.password}
                    onChange={(event) =>
                      handleOnchangeInput(event.target.value, "password")
                    }
                  ></input>
                </>
              )}
            </div>
            <div className="col-12 col-sm-12  form-group">
              <label>Address</label>
              <input
                className={
                  validInputs.address
                    ? "form-control"
                    : "form-control is-invalid"
                }
                type="text"
                value={userData.address}
                onChange={(event) =>
                  handleOnchangeInput(event.target.value, "address")
                }
              ></input>
            </div>
            <div className="col-12 col-sm-6 form-group">
              <label>Gender</label>
              <select
                className={
                  validInputs.sex ? "form-select" : "form-select is-invalid"
                }
                onChange={(event) =>
                  handleOnchangeInput(event.target.value, "sex")
                }
                value={userData.sex}
              >
                {listGender &&
                  listGender.length > 0 &&
                  listGender.map((item, index) => {
                    return (
                      <option key={index} value={item}>
                        {item}
                      </option>
                    );
                  })}
              </select>
            </div>
            <div className="col-12 col-sm-6 form-group">
              <label>
                Group <span className="text-danger">(*)</span>
              </label>
              <select
                className={
                  validInputs.group ? "form-select" : "form-select is-invalid"
                }
                onChange={(event) =>
                  handleOnchangeInput(event.target.value, "group")
                }
                value={userData.group}
              >
                {userGroup &&
                  userGroup.length > 0 &&
                  userGroup.map((item, index) => {
                    return (
                      <option key={`group-${index}`} value={item.id}>
                        {item.name}
                      </option>
                    );
                  })}
              </select>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => handleCloseModalUser()}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleConfirmUser()}>
            {action === "CREATE" ? "Save" : "Update"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ModalUser;
