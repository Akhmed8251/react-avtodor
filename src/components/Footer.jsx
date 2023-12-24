import { useState, useEffect } from "react";
import logo from "../assets/images/logo.svg";
import { Link } from "react-router-dom";
import { DynamicAdapt } from "../utils/dynamicAdapt";
import { useFetching } from "../hooks/useFetching";
import MainMenuService from "../api/MainMenuService";
import Loader from './ui/Loader'

const Footer = () => {
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
    const da = new DynamicAdapt("max");
    da.init();

    getMainMenu()
  }, []);

  return (
    <footer className="footer">
      <div className="footer__top footer-top">
        <div className="footer-top__container container">
          <div className="footer-top__logo-wrapper">
            <div className="footer-top__logo logo">
              <a href="/" className="logo__img">
                <img src={logo} alt="Логотип МАДИ" />
              </a>
              <div className="logo__text logo-text">
                <div className="logo-text__wrapper">
                  <span className="logo-text__wrapper-item logo-text__wrapper-item_main">
                    МАДИ
                  </span>
                  <span className="logo-text__wrapper-item">
                    Махачкалинский филиал
                  </span>
                </div>
                <span
                  className="logo-text__item"
                  data-da=".footer-top__logo-wrapper, 575, 1"
                >
                  Московский автомобильно-дорожный государственный технический
                  университет
                </span>
              </div>
            </div>
            <span className="logo__name">
              ФЕДЕРАЛЬНОЕ ГОСУДАРСТВЕННОЕ БЮДЖЕТНОЕ ОБРАЗОВАТЕЛЬНОЕ УЧРЕЖДЕНИЕ
              ВЫСШЕГО ОБРАЗОВАНИЯ
            </span>
          </div>
          <ul className="footer-top__list">
            {
              isMenuLoading
                ?
                <Loader />
                :
                mainMenu
                  .filter((m) => m.topMainPageIsVisible === true && m.sideMenuIsVisible === false)
                  .map((mainMenuItem, idx) => (
                    <li key={idx} className="footer-top__item">
                      <Link to={mainMenuItem.link} className="footer-top__link">
                        {mainMenuItem.name}
                      </Link>
                    </li>
                  ))
            }
          </ul>
        </div>
      </div>
      <ul className="footer__menu-list">
        {
          isMenuLoading ? <Loader />
            :
            mainMenu.filter(m => m.menuAboveAdvertisingIsVisible === true).map((mainMenuItem, idx) => (
              <li key={idx} className={`footer__menu-item ${idx % 2 != 0 ? "footer__menu-item_dark" : ""}`}>
                <Link to={mainMenuItem.link} className="footer__menu-link" target='_blank'>
                  {mainMenuItem.name}
                </Link>
              </li>
            ))
        }
      </ul>
      <div className="footer__bottom footer-bottom">
        <div className="footer-bottom__container container">
          <ul className="footer-bottom__list">
            {
              isMenuLoading
                ?
                <Loader />
                :
                mainMenu
                  .filter((m) => m.topMainPageIsVisible === false && m.sideMenuIsVisible === null)
                  .map((mainMenuItem) => (
                    <li className="footer-bottom__item footer-item">
                      <h3 className="footer-item__title">{mainMenuItem.name}</h3>
                      <ul className="footer-item__elements">
                        {
                          mainMenuItem.childMenu.map(childMenuItem => (
                            <li className="footer-item__element">
                              <Link to={childMenuItem.link} className="footer-item__link">
                                {childMenuItem.name}
                              </Link>
                            </li>
                          ))
                        }
                      </ul>
                    </li>
                  ))
            }
          </ul>
          <div className="footer-bottom__links">
            {
              isMenuLoading
                ?
                <Loader />
                :
                mainMenu
                  .filter((m) => m.topMainPageIsVisible === false)
                  .map((mainMenuItem) => (
                    <Link to={mainMenuItem.link} className="footer-bottom__link">
                      {mainMenuItem.name}
                    </Link>
                  ))
            }
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
