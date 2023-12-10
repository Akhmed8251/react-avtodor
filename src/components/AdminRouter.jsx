import { Routes, Route, Navigate } from "react-router-dom";
import { privateRoutes } from "../router";

const AppRouter = () => {
  require("../assets/css/admin.css");

  return (
    <Routes>
      {privateRoutes.map((route) => (
        <Route
          element={route.element}
          path={route.path}
          exact={route.exact}
          key={route.path}
        />
      ))}
      <Route element={<Navigate to="/admin" />} path="*" exact={true} />
    </Routes>
  );
};

export default AppRouter;
