/* eslint-disable react-hooks/exhaustive-deps */
import "./Users.scss";
import React, { useCallback, useEffect, useState } from "react";
import { FetchAllUsers } from "../../service/UserService";
import ReactPaginate from "react-paginate";
import { deleteUser } from "../../service/UserService";
import { toast } from "react-toastify";
import ModalDelete from "./ModalDelete";
import ModalUser from "./ModalUser";

function Users(props) {
  const [listUsers, setListUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentLimit, setCurrentLimit] = useState(30);
  const [totalPages, setTotalPage] = useState(0);
  const [isShowModalDelete, setShowModalDelete] = useState(false);
  // data modal delete
  const [dataModal, setDataModal] = useState({});
  const [isShowModalUser, setShowModalUser] = useState(false);

  const [actionModalUser, setActionModalUser] = useState("CREATE");
  // data modal update/create user
  const [dataModalEdit, setDataModalEdit] = useState({});

  useEffect(() => {
    fetchUser();
  }, [currentPage]);

  const fetchUser = async () => {
    let res = await FetchAllUsers(currentPage, currentLimit);

    if (res && res.EC === 0) {
      setTotalPage(res.DT.totalPages);
      setListUsers(res.DT.users);
    }
  };

  const handlePageClick = async (event) => {
    setCurrentPage(+event.selected + 1);
  };

  const handleDeleteUser = async (user) => {
    setDataModal(user);
    setShowModalDelete(!isShowModalDelete);
  };

  const handleEditUser = (user) => {
    setActionModalUser("UPDATE");
    setDataModalEdit(user);
    setShowModalUser(!isShowModalUser);
  };

  const confirmDeleteUser = async () => {
    let res = await deleteUser(dataModal);
    if (res && res.EC === 0) {
      toast.success(res.EM);
      await fetchUser();
    } else {
      toast.error(res.EM);
    }
  };
  const toggleShowModalDelete = () => {
    setDataModal({});
    setShowModalDelete(!isShowModalDelete);
  };

  const toggleShowModalUser = async () => {
    setShowModalUser(false);
    setDataModal({});
    await fetchUser();
  };

  const handleRefresh = async () => {
    await fetchUser();
  };
  return (
    <>
      <div className="container">
        <div className="manage-users-container">
          <div className="user-header">
            <div className="title my-3">
              <h3>Manage users</h3>
            </div>
            <div className="actions my-3">
              <button
                className="btn btn-success mx-3 refresh"
                onClick={() => handleRefresh()}
              >
                <i className="fa fa-refresh"></i> Refresh
              </button>
              <button
                className="btn btn-primary"
                onClick={() => {
                  setShowModalUser(true);
                  setActionModalUser("CREATE");
                }}
              >
                <i className="fa fa-plus-circle"></i>
                Add new user
              </button>
            </div>
          </div>

          <div className="user-body">
            <table className="table table-bordered table-hover">
              <thead>
                <tr>
                  <th scope="col">No</th>
                  <th scope="col">Id</th>
                  <th scope="col">Email</th>
                  <th scope="col">Username</th>
                  <th scope="col">Group</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {listUsers && listUsers.length > 0 ? (
                  <>
                    {listUsers.map((item, index) => {
                      return (
                        <tr key={`row-${index}`}>
                          <td>
                            {(currentPage - 1) * currentLimit + index + 1}
                          </td>
                          <td>{item.id}</td>
                          <td>{item.email}</td>
                          <td>{item.username}</td>
                          <td>{item.Group ? item.Group.name : ""}</td>
                          <td>
                            <span
                              title="Edit"
                              className="edit"
                              onClick={() => handleEditUser(item)}
                            >
                              <i className="fa fa-pencil"></i>
                            </span>
                            <span
                              title="Delete"
                              className="delete"
                              onClick={() => handleDeleteUser(item)}
                            >
                              <i className="fa fa-trash"></i>
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </>
                ) : (
                  <>
                    <tr>
                      <td>Not found User!</td>
                    </tr>
                  </>
                )}
              </tbody>
            </table>
          </div>

          <div className="user-footer">
            {totalPages > 0 && (
              <ReactPaginate
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={1}
                marginPagesDisplayed={1}
                pageCount={totalPages}
                previousLabel="< previous"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakLabel="..."
                breakClassName="page-item"
                breakLinkClassName="page-link"
                containerClassName="pagination"
                activeClassName="active"
                renderOnZeroPageCount={null}
              />
            )}
          </div>
        </div>
      </div>
      <ModalDelete
        show={isShowModalDelete}
        toggleShowModalDelete={toggleShowModalDelete}
        dataModal={dataModal}
        confirmDeleteUser={confirmDeleteUser}
      ></ModalDelete>
      <ModalUser
        show={isShowModalUser}
        toggleShowModalUser={toggleShowModalUser}
        fetchUser={fetchUser}
        action={actionModalUser}
        dataModalEdit={dataModalEdit}
      ></ModalUser>
    </>
  );
}

export default Users;
