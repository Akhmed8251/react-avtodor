import { useState, useEffect } from "react";
import logo from "../assets/images/logo.svg";
import { Link } from "react-router-dom";
import { DynamicAdapt } from "../utils/dynamicAdapt";
import { useFetching } from "../hooks/useFetching";
import MainMenuService from "../api/MainMenuService";

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
  }, []);

  return (
    <footer className="footer">
      <div className="footer__vision">
        <span className="footer__vision-text">Версия для слабовидящих</span>
        <a href="/" className="footer__vision-btn"></a>
      </div>
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
                <div>Звгрузка...</div>
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
        <li className="footer__menu-item">
          <a href="/" className="footer__menu-link">
            ЭИОС (Moodle)
          </a>
        </li>
        <li className="footer__menu-item footer__menu-item_dark">
          <a href="/" className="footer__menu-link">
            ЛК абитуриента
          </a>
        </li>
        <li className="footer__menu-item">
          <a href="/" className="footer__menu-link">
            ЛК студента
          </a>
        </li>
        <li className="footer__menu-item footer__menu-item_dark">
          <a href="/" className="footer__menu-link">
            Расписание занятий
          </a>
        </li>
      </ul>
      <div className="footer__bottom footer-bottom">
        <div className="footer-bottom__container container">
          <ul className="footer-bottom__list">
          {
            isMenuLoading
            ?
              <div>Загрузка...</div>
            :
              mainMenu
              .filter((m) => m.topMainPageIsVisible === null && m.sideMenuIsVisible === null)
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
            {/* <li className="footer-bottom__item footer-item">
              <h3 className="footer-item__title">Университет</h3>
              <ul className="footer-item__elements">
                <li className="footer-item__element">
                  <a href="/" className="footer-item__link">
                    Общая информация
                  </a>
                </li>
                <li className="footer-item__element">
                  <a href="/" className="footer-item__link">
                    Стратегия развития МАДИ
                  </a>
                </li>
                <li className="footer-item__element">
                  <a href="/" className="footer-item__link">
                    Политика в области качества
                  </a>
                </li>
              </ul>
            </li>
            <li className="footer-bottom__item footer-item">
              <h3 className="footer-item__title">Контакты</h3>
              <ul className="footer-item__elements">
                <li className="footer-item__element">
                  <a href="/" className="footer-item__link">
                    Часто задаваемые вопросы
                  </a>
                </li>
                <li className="footer-item__element">
                  <a href="/" className="footer-item__link">
                    Задать вопрос
                  </a>
                </li>
                <li className="footer-item__element">
                  <a href="/" className="footer-item__link">
                    Анкета для выражения мнения о качестве условий оказания
                    услуг
                  </a>
                </li>
              </ul>
            </li>
            <li className="footer-bottom__item footer-item">
              <h3 className="footer-item__title">Филиал</h3>
              <ul className="footer-item__elements">
                <li className="footer-item__element">
                  <a href="/" className="footer-item__link">
                    Воспитательная и социальная работа
                  </a>
                </li>
                <li className="footer-item__element">
                  <a href="/" className="footer-item__link">
                    Студенческий совет
                  </a>
                </li>
                <li className="footer-item__element">
                  <a href="/" className="footer-item__link">
                    Комплексная безопасность
                  </a>
                </li>
                <li className="footer-item__element">
                  <a href="/" className="footer-item__link">
                    Профком работников
                  </a>
                </li>
                <li className="footer-item__element">
                  <a href="/" className="footer-item__link">
                    Центр содействия трудоустройству выпускников
                  </a>
                </li>
                <li className="footer-item__element">
                  <a href="/" className="footer-item__link">
                    Пресс-центр
                  </a>
                </li>
                <li className="footer-item__element">
                  <a href="/" className="footer-item__link">
                    Новости
                  </a>
                </li>
                <li className="footer-item__element">
                  <a href="/" className="footer-item__link">
                    Внутренняя оценка качества образования
                  </a>
                </li>
              </ul>
            </li>
            <li className="footer-bottom__item footer-item">
              <h3 className="footer-item__title">Студенту</h3>
              <ul className="footer-item__elements">
                <li className="footer-item__element">
                  <a href="/" className="footer-item__link">
                    Учебно-методический отдел
                  </a>
                </li>
                <li className="footer-item__element">
                  <a href="/" className="footer-item__link">
                    Библиотека
                  </a>
                </li>
                <li className="footer-item__element">
                  <a href="/" className="footer-item__link">
                    Нормативные документы
                  </a>
                </li>
                <li className="footer-item__element">
                  <a href="/" className="footer-item__link">
                    Стипендиальное обеспечение
                  </a>
                </li>
                <li className="footer-item__element">
                  <a href="/" className="footer-item__link">
                    Обучение инвалидов и лиц с ОВЗ
                  </a>
                </li>
                <li className="footer-item__element">
                  <a href="/" className="footer-item__link">
                    Основные профессиональные образовательные программы
                  </a>
                </li>
                <li className="footer-item__element">
                  <a href="/" className="footer-item__link">
                    Расписание
                  </a>
                </li>
              </ul>
            </li>
            <li className="footer-bottom__item footer-item">
              <h3 className="footer-item__title">Факультеты</h3>
              <ul className="footer-item__elements">
                <li className="footer-item__element">
                  <a href="/" className="footer-item__link">
                    Факультет транспорта, дорожного строительства и экономики
                  </a>
                </li>
                <li className="footer-item__element">
                  <a href="/" className="footer-item__link">
                    Кафедра «Автомобильного транспорта и дорожного хозяйства»
                  </a>
                </li>
                <li className="footer-item__element">
                  <a href="/" className="footer-item__link">
                    Кафедра «Экономики и управления»
                  </a>
                </li>
                <li className="footer-item__element">
                  <a href="/" className="footer-item__link">
                    Факультет заочного обучения
                  </a>
                </li>
                <li className="footer-item__element">
                  <a href="/" className="footer-item__link">
                    Кафедра «Автомобильного транспорта и дорожного хозяйства»
                  </a>
                </li>
                <li className="footer-item__element">
                  <a href="/" className="footer-item__link">
                    Кафедра «Экономики и управления»
                  </a>
                </li>
              </ul>
            </li> */}
          </ul>
          <div className="footer-bottom__links">
            {
              isMenuLoading
              ?
                <div>Загрузка...</div>
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
