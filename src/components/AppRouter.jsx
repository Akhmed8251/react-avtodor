import { Routes, Route } from "react-router-dom";
import { publicRoutes } from "../router";
import SpecialVersion from "./SpecialVersion";
import PageContent from "../pages/PageContent";

const AppRouter = () => {
  return (
    <>
      <SpecialVersion />
      <Routes>
        {publicRoutes.map((route) => (
          <Route
            element={route.element}
            path={route.path}
            exact={route.exact}
            key={route.path}
          />
        ))}
        <Route element={<PageContent />} path="*" exact={true} />
      </Routes>
    </>
  );
};

export default AppRouter;
