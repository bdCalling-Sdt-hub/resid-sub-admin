import React from "react";
import { Navigate} from "react-router-dom";

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const UserData = JSON.parse(localStorage.getItem("yourInfo") || '{}');

//   console.log(UserData);

  if (UserData?.emailVerified !== false && UserData?.role === "admin" ) {
    return <>{children}</>;
  } else {
    return <Navigate to="/auth/signin" />;
  }
};

export default PrivateRoute;
