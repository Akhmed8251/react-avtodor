import { Routes, Route, Navigate } from "react-router-dom";
import { privateRoutes, privateAdminRoutes } from "../router";

const AdminRouter = ({role}) => {
  require("../assets/css/admin.css");

  return (
    <Routes>
      {
        role == "admin"
          ?
          privateAdminRoutes.map((route) => (
            <Route
              element={route.element}
              path={route.path}
              exact={route.exact}
              key={route.path}
            />
          ))
          :
          privateRoutes.map((route) => (
            <Route
              element={route.element}
              path={route.path}
              exact={route.exact}
              key={route.path}
            />
          ))
      }
      <Route element={<Navigate to="/admin" />} path="*" exact={true} />
    </Routes>
  );
};

export default AdminRouter;
