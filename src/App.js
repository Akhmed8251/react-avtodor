import "swiper/swiper-bundle.css";
import "./assets/css/style.css";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/AppRouter";
import AdminRouter from "./components/AdminRouter";
import HeaderAdmin from "./components/admin/HeaderAdmin";
import Sidebar from "./components/ui/Sidebar";
import { AdminContext } from "./context";
import { useEffect, useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [employeeName, setEmployeeName] = useState(null);
  const [isAdminViewPublicPage, setIsAdminViewPublicPage] = useState(false)
  const [isOpenSidebar, setIsOpenSidebar] = useState(true);
  const [currentPageName, setCurrentPageName] = useState(null)
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (localStorage.getItem("isAuth")) {
      setIsAuth(true);
      setIsAdminViewPublicPage(localStorage.getItem("isAdminViewPublicPage") == "true")
      setEmployeeName(localStorage.getItem("employeeName"))
    }

    
    setIsLoading(false);
  }, []);

  return (
    !isLoading &&
    (isAuth && !isAdminViewPublicPage ? (
      <AdminContext.Provider value={{ isAuth, setIsAuth, isOpenSidebar, setIsOpenSidebar, currentPageName, setCurrentPageName, isAdminViewPublicPage, setIsAdminViewPublicPage, employeeName, setEmployeeName }}>
        <BrowserRouter>
          <div className="page">
            <HeaderAdmin />
            <main style={{ backgroundColor: "#f9fbfb" }}>
              <div className="admin-wrapper">
                <Sidebar />
                <AdminRouter />
              </div>
            </main>
          </div>
        </BrowserRouter>
      </AdminContext.Provider>
    ) : (!isAuth || (isAuth && isAdminViewPublicPage)) && (
      <AdminContext.Provider value={{ isAuth, setIsAuth, isAdminViewPublicPage, setIsAdminViewPublicPage, employeeName, setEmployeeName }}>
        <BrowserRouter>
          <div className="page">
            <Header />
            <main>
              <AppRouter />
            </main>
            <Footer />
          </div>
        </BrowserRouter>
      </AdminContext.Provider>
    ))
  );
}

export default App;
