import React, { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { UserContext } from "../context/userProvider";
function PrivateRoutes(props) {

  const { user } = useContext(UserContext);

  if (user && user.isAuthenticated === true) {
    return (
      <>
        <Outlet />
      </>
    );

  } else {
    return (
      <Navigate to="/login"></Navigate>
    )

  }

}

export default PrivateRoutes;
