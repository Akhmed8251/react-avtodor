import logo from '../assets/images/logo.svg'
import { Link } from 'react-router-dom'
import { DynamicAdapt } from '../utils/dynamicAdapt'
import { useContext, useEffect } from 'react'
import { MfMadiContext } from '../context'


const Header = ({ mainMenu }) => {
  const { isOpenSideMenu, setIsOpenSideMenu  } = useContext(MfMadiContext)

  useEffect(() => {
    const headerBottomList = document.querySelector(".header-bottom__list")
    if (window.location.pathname === "/") {
        headerBottomList.setAttribute("data-da", "main, 425, 1")
    }

    const da = new DynamicAdapt("max")
    da.init()
  }, [])

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
                        mainMenu.filter(m => m.topMainPageIsVisible === true).map((mainMenuItem, idx) => (
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
                            <li className="header-menu__item has-submenu" onClick={(evt) => openSubMenu(evt.target.closest(".has-submenu"))}>
                                <button className="header-menu__submenu-btn submenu-btn">
                                    <span className="submenu-btn__text">главная</span>
                                    <div className="submenu-btn__icon">
                                        <svg width="18" height="11" viewBox="0 0 18 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M1 1L9 9L17 1" stroke="#4a27c9" strokeWidth="2"/>
                                        </svg> 
                                    </div>
                                </button>
                                <div className="submenu">
                                    <ul className="submenu__list">
                                        <li className="submenu__item">
                                            <a href="/" className="submenu__link">пункт 1</a>
                                        </li>
                                        <li className="submenu__item">
                                            <a href="/" className="submenu__link">пункт 2</a>
                                        </li>
                                        <li className="submenu__item">
                                            <a href="/" className="submenu__link">пункт 3</a>
                                        </li>
                                        <li className="submenu__item">
                                            <a href="/" className="submenu__link">пункт 4</a>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            <li className="header-menu__item">
                                <a href="/" className="header-menu__link">Сведения об образовательной организации</a>
                            </li>
                            <li className="header-menu__item">
                                <a href="/" className="header-menu__link">Студенческий совет</a>
                            </li>
                            <li className="header-menu__item">
                                <a href="/" className="header-menu__link">Комплексная безопасность</a>
                            </li>
                            <li className="header-menu__item">
                                <a href="/" className="header-menu__link">Центр содействия трудоустройству выпускников</a>
                            </li>
                            <li className="header-menu__item">
                                <a href="/" className="header-menu__link">Новости</a>
                            </li>
                            <li className="header-menu__item">
                                <a href="/" className="header-menu__link">Внутренняя оценка качества образования</a>
                            </li>
                            <li className="header-menu__item">
                                <a href="/" className="header-menu__link">Воспитательная и социальная работа</a>
                            </li>
                            <li className="header-menu__item has-submenu" onClick={(evt) => openSubMenu(evt.target.closest(".has-submenu"))}>
                                <button className="header-menu__submenu-btn submenu-btn">
                                    <span className="submenu-btn__text">студенту</span>
                                    <div className="submenu-btn__icon">
                                        <svg width="18" height="11" viewBox="0 0 18 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M1 1L9 9L17 1" stroke="#4a27c9" strokeWidth="2"/>
                                        </svg> 
                                    </div>
                                </button>
                                <div className="submenu">
                                    <ul className="submenu__list">
                                        <li className="submenu__item">
                                            <a href="/" className="submenu__link">пункт 1</a>
                                        </li>
                                        <li className="submenu__item">
                                            <a href="/" className="submenu__link">пункт 2</a>
                                        </li>
                                        <li className="submenu__item">
                                            <a href="/" className="submenu__link">пункт 3</a>
                                        </li>
                                        <li className="submenu__item">
                                            <a href="/" className="submenu__link">пункт 4</a>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            <li className="header-menu__item">
                                <a href="/" className="header-menu__link">факультеты</a>
                            </li>
                            <li className="header-menu__item">
                                <a href="/" className="header-menu__link">абитуриенту</a>
                            </li>
                            <li className="header-menu__item has-submenu" onClick={(evt) => openSubMenu(evt.target.closest(".has-submenu"))}>
                                <button className="header-menu__submenu-btn submenu-btn">
                                    <span className="submenu-btn__text">Контакты</span>
                                    <div className="submenu-btn__icon">
                                        <svg width="18" height="11" viewBox="0 0 18 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M1 1L9 9L17 1" stroke="#4a27c9" strokeWidth="2"/>
                                        </svg>
                                    </div>
                                </button>
                                <div className="submenu">
                                    <ul className="submenu__list">
                                        <li className="submenu__item">
                                            <a href="/" className="submenu__link">пункт 1</a>
                                        </li>
                                        <li className="submenu__item">
                                            <a href="/" className="submenu__link">пункт 2</a>
                                        </li>
                                        <li className="submenu__item">
                                            <a href="/" className="submenu__link">пункт 3</a>
                                        </li>
                                        <li className="submenu__item">
                                            <a href="/" className="submenu__link">пункт 4</a>
                                        </li>
                                    </ul>
                                </div>

                            </li>
                        </ul>
                    </div>
                </div>
                <ul className="header-bottom__list">
                    <li className="header-bottom__item">
                        <a href="/" className="header-bottom__link">
                            ЭИОС (Moodle)
                        </a>
                    </li>
                    <li className="header-bottom__item header-bottom__item_dark">
                        <a href="/" className="header-bottom__link">
                            ЛК абитуриента
                        </a>
                    </li>
                    <li className="header-bottom__item">
                        <a href="/" className="header-bottom__link">
                            ЛК студента
                        </a>
                    </li>
                    <li className="header-bottom__item header-bottom__item_dark">
                        <a href="/" className="header-bottom__link">
                            Расписание занятий
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </header>
  )
}

export default Header