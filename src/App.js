import { useState, useEffect } from "react";
import "./assets/css/style.css";
import { useFetching } from "./hooks/useFetching";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/AppRouter";
import MainMenuService from "./api/MainMenuService";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { MfMadiContext } from "./context";

function App() {
  const [isOpenSideMenu, setIsOpenSideMenu] = useState(false)

  const [mainMenu, setMainMenu] = useState([])
  const [getMainMenu, isMenuLoading, menuErr] = useFetching(async () => {
    const response = await MainMenuService.getAllMainMenu()
    if (response.status === 200) {
      setMainMenu(response.data)
    } else {
      console.log(menuErr)
    }
  });

  useEffect(() => {
    getMainMenu()
  }, [])

  return (
    <MfMadiContext.Provider
      value={{
        isOpenSideMenu,
        setIsOpenSideMenu,
      }}
    >
      <BrowserRouter>
        <div className="page">
          {isMenuLoading ? <div>Загрузка</div> : <Header mainMenu={mainMenu} />}
          <main>
            <AppRouter />
          </main>
          {isMenuLoading ? <div>Загрузка</div> : <Footer mainMenu={mainMenu} />}
        </div>
      </BrowserRouter>
    </MfMadiContext.Provider>
  );
}

export default App;
