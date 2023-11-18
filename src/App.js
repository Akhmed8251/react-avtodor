import { useEffect, useState } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import './assets/css/style.css'
import { BrowserRouter } from 'react-router-dom';
import { useFetching } from './hooks/useFetching'
import MainMenuService from './api/MainMenuService'
import AppRouter from './components/AppRouter';

function App() {
  const [mainMenu, setMainMenu] = useState([])
  const [getMainMenu, isMenuLoading, menuErr] = useFetching(async () => {
    const response = await MainMenuService.getAllMainMenu()
    if (response.status === 200) {
      setMainMenu(response.data)
    } else {
      console.log(menuErr)
    }
  })


  useEffect(() => {
    getMainMenu()
  }, [])

  return (
    <BrowserRouter>
      <div className="page">
        {isMenuLoading ? <div>Загрузка</div> : <Header mainMenu={mainMenu} />}
        <main>
          <AppRouter />
        </main>
        {isMenuLoading ? <div>Загрузка</div> : <Footer mainMenu={mainMenu} />}
      </div>
    </BrowserRouter>
  );
}

export default App;
