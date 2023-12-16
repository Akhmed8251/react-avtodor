import logo from '../assets/images/logo.svg'
import { Link } from 'react-router-dom'
import { DynamicAdapt } from '../utils/dynamicAdapt'
import { useState, useEffect, useContext } from 'react'
import { useFetching } from '../hooks/useFetching'
import MainMenuService from '../api/MainMenuService'
import Loader from './ui/Loader'
import { AdminContext } from '../context'


const Header = () => {
  const { isAuth, setIsAuth, setIsAdminViewPublicPage, employeeName, setEmployeeName } = useContext(AdminContext)

  const [isOpenSideMenu, setIsOpenSideMenu] = useState(false)

  const [mainMenu, setMainMenu] = useState([])
  const [getMainMenu, isMenuLoading, menuErr] = useFetching(async () => {
    const response = await MainMenuService.getMainMenu()
    if (response.status === 200) {
      setMainMenu(response.data)
    } else {
      console.log(menuErr)
    }
  });

  useEffect(() => {
    const headerBottomList = document.querySelector(".header-bottom__list")
    if (window.location.pathname === "/") {
        headerBottomList.setAttribute("data-da", "main, 425, 1")
    }

    const da = new DynamicAdapt("max")
    da.init()

    getMainMenu()
  }, [])

  const logout = () => {
    localStorage.clear()
    setIsAuth(false)
    setIsAdminViewPublicPage(false)
    setEmployeeName(null)
  }

  const toggleSideMenu = () => {
    setIsOpenSideMenu(prev => !prev);

    document.body.classList.toggle("no-scroll")
    document.body.classList.toggle("backdrop")
  }

  const openSubMenu = (menuWithSubmenu) => {
    menuWithSubmenu.classList.toggle("_open")

    const submenu = menuWithSubmenu.querySelector(".submenu");
    if (menuWithSubmenu.classList.contains("_open")) {
        submenu.style.maxHeight = submenu.scrollHeight + "px";
    } else {
        submenu.style.maxHeight = null;
    }
  }
  
  return (
    <header className="header">
        <div className="header__top header-top">
            <div className="header-top__container container">
                <span className="header-top__name">
                    ФЕДЕРАЛЬНОЕ ГОСУДАРСТВЕННОЕ БЮДЖЕТНОЕ ОБРАЗОВАТЕЛЬНОЕ УЧРЕЖДЕНИЕ ВЫСШЕГО ОБРАЗОВАНИЯ
                </span>
                <div className="header-top__wrapper">
                    <a className="header-top__link" href="tel:+8352634763">
                        (8352) 63-47-63
                    </a>
                    <a className="header-top__link" href="mailto:mfmadi@mail.ru">
                        mfmadi@mail.ru
                    </a>
                    <time className="header-top__worktime">пн - пт 8:30 - 17:00</time>
                    
                </div>
                <div className="header-top__vision">
                    <a href="/" className="header-top__vision-btn"></a>
                </div>
            </div>
        </div>
        <div className='header__admin'>
            <div className="container">
                <div className="header__admin-content">
                    {
                        isAuth 
                          ?
                            <>
                                <Link onClick={() => { localStorage.setItem("isAdminViewPublicPage", "false");  setIsAdminViewPublicPage(false)} } to={'/admin'} className="header__admin-name admin-name">{employeeName}</Link>
                                <button type='button' className='btn logout-btn' onClick={() => logout()}>Выйти</button>
                            </> 
                          : 
                            <Link to={'/login'} className='header__admin-btn btn'>Вход</Link>
                    }
                </div>
            </div>
        </div>
        <div className="header__main header-main">
            <div className="header-main__container container">
                <div className="header-main__logo-wrapper">
                    <div className="header-main__logo logo">
                        <Link to="/" className="logo__img">
                            <img src={logo} alt="Логотип МАДИ" />
                        </Link>
                        <div className="logo__text logo-text">
                            <div className="logo-text__wrapper">
                                <span className="logo-text__wrapper-item logo-text__wrapper-item_main">МАДИ</span>
                                <span className="logo-text__wrapper-item">Махачкалинский филиал</span>
                            </div>
                            <span className="logo-text__item" data-da=".header-main__logo-wrapper, 575, last">Московский автомобильно-дорожный государственный технический
                                университет</span>
                        </div>
                    </div>
                </div>
                <ul className="header-main__list">
                    {
                        isMenuLoading
                            ?
                                <Loader />
                            :
                                mainMenu.filter(m => m.topMainPageIsVisible === true && m.sideMenuIsVisible === false).map((mainMenuItem, idx) => (
                                    <li key={idx} className="header-main__item">
                                        <Link to={mainMenuItem.link} className="header-main__link">
                                            {mainMenuItem.name}
                                        </Link>
                                    </li>
                                ))
                    }
                </ul>
            </div>
        </div>
        <div className="header__bottom header-bottom">
            <div className="header-bottom__container container">
                <button onClick={() => toggleSideMenu() } type="button" className={`header-bottom__menu-btn ${isOpenSideMenu ? "_close": ""}`} data-da=".header-top__container, 768, first"></button>
                <div className={`header-bottom__menu header-menu ${isOpenSideMenu ? "_active" : ""}`}>
                    <div className="header-menu__body">
                        <div className="header-menu__top">
                            <span className="header-menu__top-item header-menu__top-item_main">МАДИ</span>
                            <span className="header-menu__top-item">Махачкалинский филиал</span>
                        </div>
                        <ul className="header-menu__list">
                            {
                                isMenuLoading
                                    ?
                                        <Loader />
                                    :
                                        mainMenu.filter(m => m.sideMenuIsVisible === true).map((mainMenuItem, idx) => (
                                            (mainMenu.childMenu && mainMenuItem.childMenu.length > 0)
                                                ?
                                                    <li key={idx} className="header-menu__item has-submenu" onClick={(evt) => openSubMenu(evt.target.closest(".has-submenu"))}>
                                                        <button className="header-menu__submenu-btn submenu-btn">
                                                            <span className="submenu-btn__text">{mainMenuItem.name}</span>
                                                            <div className="submenu-btn__icon">
                                                                <svg width="18" height="11" viewBox="0 0 18 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <path d="M1 1L9 9L17 1" stroke="#4a27c9" strokeWidth="2"/>
                                                                </svg> 
                                                            </div>
                                                        </button>
                                                        <div className="submenu">
                                                            <ul className="submenu__list">
                                                                {
                                                                    mainMenuItem.childMenu.map((childMenuItem, idx) => (
                                                                        <li key={idx} className="submenu__item">
                                                                            <Link to={childMenuItem.link} className="submenu__link">{childMenuItem.name}</Link>
                                                                        </li>
                                                                    ))
                                                                }
                                                            </ul>
                                                        </div>
                                                    </li>
                                                :
                                                    <li key={idx} className="header-menu__item">
                                                        <Link to={mainMenuItem.link} className="header-menu__link">{mainMenuItem.name}</Link>
                                                    </li>
                                        ))
                            }
                        </ul>
                    </div>
                </div>
                <ul className="header-bottom__list">
                    {
                        isMenuLoading ? <Loader />
                        :
                            mainMenu.filter(m => m.menuAboveAdvertisingIsVisible === true).map((mainMenuItem, idx) => (
                                <li key={idx} className={`header-bottom__item ${idx % 2 != 0 ? "header-bottom__item_dark" : ""}`}>
                                    <Link to={mainMenuItem.link} className="header-bottom__link" target='_blank'>
                                        {mainMenuItem.name}
                                    </Link>
                                </li>
                            ))
                    }
                </ul>
            </div>
        </div>
    </header>
  )
}

export default Header