import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context";
import { Link } from "react-router-dom";

const pages = [
  {
    label: "Новости",
    value: "news",
  },
  {
    label: "Партнеры",
    value: "partners",
  },
  {
    label: "Объявления",
    value: "advertisings",
  },
  {
    label: "Контакты",
    value: "contacts",
  },
  {
    label: "Страницы",
    value: "pages",
  },
  {
    label: "ОбМАДИ",
    value: "about",
  },
  {
    label: "Меню",
    value: "all-menu",
  },
];

const Sidebar = () => {
  const { isOpenSidebar, currentPageName, employeeRole } = useContext(AdminContext);

  const clearLinks = () => {
    const links = document.querySelectorAll(".sidebar__item");
    links.forEach((link) => {
      if (link.classList.contains("_active")) {
        link.classList.remove("_active");
      }
    });
  };

  const setActiveLinkByName = (activeSideBarLinkName) => {
    clearLinks();

    const linkActive = document.querySelector(
      `[data-name=${activeSideBarLinkName}]`
    );
    linkActive.classList.add("_active");
  };

  useEffect(() => {
    if (currentPageName) {
      setActiveLinkByName(currentPageName);
    }
  }, [currentPageName]);

  return (
    <aside className={`sidebar ${isOpenSidebar ? "_open" : ""}`}>
      <ul className="sidebar__list">
        {pages.map((page, idx) => (
          <li key={idx} className="sidebar__item" data-name={page.label}>
            <Link to={`/admin/${page.value}`} className="sidebar__link">
              {page.label}
            </Link>
          </li>
        ))}
        {
          employeeRole == "admin"
          &&
          <li key={pages.length} className="sidebar__item" data-name="Пользователи">
            <Link to={`/admin/users`} className="sidebar__link">
              Пользователи
            </Link>
          </li>
        }
      </ul>
    </aside>
  );
};

export default Sidebar;
