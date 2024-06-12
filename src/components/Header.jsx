import logo from '../assets/images/logo.svg'
import { DynamicAdapt } from '../utils/dynamicAdapt'
import { useState, useEffect, useContext } from 'react'
import { useFetching } from '../hooks/useFetching'
import MainMenuService from '../api/MainMenuService'
import Loader from './ui/Loader'
import { AdminContext } from '../context'
import specialVision from '../assets/images/special-vision.svg'
import ContactsService from '../api/ContactsService'
import { Link } from 'react-router-dom'
import Tree from './ui/Tree'

const Header = () => {
  const {isAuth, setIsAuth, setIsAdminViewPublicPage, employeeName, setEmployeeName, setEmployeeRole } = useContext(AdminContext)

  const [isOpenSideMenu, setIsOpenSideMenu] = useState(false)

  const [mainMenu, setMainMenu] = useState([])
  const [getMainMenu, isMenuLoading, menuErr] = useFetching(async () => {
    const response = await MainMenuService.getMainMenuHierarchical()
    if (response.status === 200) {
      setMainMenu(response.data)
    } else {
      console.log(menuErr)
    }
  });

  const [contacts, setContacts] = useState([]);
  const [getContacts, isContactsLoading, contactsErr] = useFetching(
    async () => {
      const response = await ContactsService.getContacts();
      if (response.status === 200) {
        setContacts(
          response.data.filter(c => c.isTopMainPageVisible == true)
        );
      } else {
        console.log(contactsErr);
      }
    }
  );

  useEffect(() => {
    const headerBottomList = document.querySelector(".header-bottom__list")
    if (window.location.pathname === "/") {
        headerBottomList.setAttribute("data-da", "main, 425, 1")
    }

    const da = new DynamicAdapt("max")
    da.init()

    getMainMenu()
    getContacts()
  }, [])

  const logout = () => {
    localStorage.clear()
    setIsAuth(false)
    setIsAdminViewPublicPage(false)
    setEmployeeName(null)
    setEmployeeRole(null)
  }

  const toggleSideMenu = () => {
    setIsOpenSideMenu(prev => !prev);
    const headerMenu = document.querySelector(".header-menu")
    headerMenu.classList.toggle("_active")

    document.body.classList.toggle("no-scroll")

    const headerMenuBody = document.querySelector(".header-menu__body")
    if (headerMenu.classList.contains("_active")) {
        const headerTopContainer = document.querySelector(".header-top__container")
        if (window.matchMedia("(min-width: 769px)").matches) {
            headerMenuBody.style.transform = `translateY(0px)`
            headerMenuBody.style.paddingBottom = `${headerTopContainer.scrollHeight}px`
        } else {
            headerMenuBody.style.transform = `translateY(${headerTopContainer.scrollHeight}px)`
            headerMenuBody.style.paddingBottom = `${headerTopContainer.scrollHeight}px`
        }
    } else {
        if (window.matchMedia("(min-width: 769px)").matches) {
            headerMenuBody.style.transform = `translateX(-100%)`
            headerMenuBody.style.paddingBottom = `0px`
        } else {
            headerMenuBody.style.transform = `translateY(-100%)`
            headerMenuBody.style.paddingBottom = `0px`
        }
    }
  }

  const toggleSubMenu = (menuWithSubmenu) => {
    menuWithSubmenu.classList.toggle("_open")

    const submenu = menuWithSubmenu.querySelector(".submenu");
    if (menuWithSubmenu.classList.contains("_open")) {
        submenu.style.maxHeight = "max-content";
    } else {
        submenu.style.maxHeight = null;
    }
  }

//   const recalcParentSubmenuHeight = (submenu) => {
//     const parentSubmenu = submenu.closest(".submenu__list").closest(".submenu")
//     console.log(`подменю = ${submenu.scrollHeight}; родитель подменю = ${parentSubmenu.scrollHeight};`)
//     parentSubmenu.style.maxHeight = parentSubmenu.scrollHeight + submenu.scrollHeight + 20 + "px"; // 20 - отступ вниз
//     console.log(`${parentSubmenu.style.maxHeight}`)
//     if (parentSubmenu.closest(".submenu__list")) {
//         recalcParentSubmenuHeight(parentSubmenu)
//     }
//   }
  
  return (
    <header className="header">
        <div className="header__top header-top">
            <div className="header-top__container container">
                <span className="header-top__name">
                    ФЕДЕРАЛЬНОЕ ГОСУДАРСТВЕННОЕ БЮДЖЕТНОЕ ОБРАЗОВАТЕЛЬНОЕ УЧРЕЖДЕНИЕ ВЫСШЕГО ОБРАЗОВАНИЯ
                </span>
                <div className="header-top__wrapper">
                    {
                        isContactsLoading ? <Loader isOnlySpinner/>
                        :
                            contacts.map((contact, idx) => (
                                <span key={idx} className='header-top__wrapper-item'>{contact.value}</span>
                            ))
                    }
                    
                </div>
                <button type='button' title="Версия сайта для слабовидящих" className="header-top__vision">
                    <img src={specialVision} id='specialButton' className="header-top__vision-btn"/>
                </button>
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
                            <img src={logo} alt="Логотип МАДИ" className='bvi-img' />
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
                                mainMenu.filter(m => m.topMainPageIsVisible === true).map((mainMenuItem, idx) => (
                                    <li key={idx} className="header-main__item">
                                        <a href={mainMenuItem.link} className="header-main__link">
                                            {mainMenuItem.name}
                                        </a>
                                    </li>
                                ))
                    }
                </ul>
            </div>
        </div>
        <div className="header__bottom header-bottom">
            <div className="header-bottom__container container">
                <button onClick={() => toggleSideMenu() } type="button" className={`header-bottom__menu-btn ${isOpenSideMenu ? "_close": ""}`} data-da=".header-top__container, 768, first"></button>
                <div className={`header-bottom__menu header-menu`}>
                    <div className="header-menu__area" onClick={() => toggleSideMenu() }></div>
                    <div className="header-menu__body">
                        <div className="header-menu__top">
                            <span className="header-menu__top-item header-menu__top-item_main">МАДИ</span>
                            <span className="header-menu__top-item">Махачкалинский филиал</span>
                        </div>
                        <Tree treeData={mainMenu.filter(m => m.sideMenuIsVisible == true)} isMainMenu openFn={(evt) => toggleSubMenu(evt.target.closest(".has-submenu"))} />
                    </div>
                </div>
                <ul className="header-bottom__list">
                    {
                        isMenuLoading ? <Loader />
                        :
                            mainMenu.filter(m => m.menuAboveAdvertisingIsVisible === true).map((mainMenuItem, idx) => (
                                <li key={idx} className={`header-bottom__item ${idx % 2 != 0 ? "header-bottom__item_dark" : ""}`}>
                                    <a href={mainMenuItem.link} className="header-bottom__link" target='_blank'>
                                        {mainMenuItem.name}
                                    </a>
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