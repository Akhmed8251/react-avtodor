import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { AdminContext } from '../../context'

const Sidebar = () => {  
  const { isOpenSidebar, currentPageName } = useContext(AdminContext)

  const clearLinks = () => {
    const links = document.querySelectorAll(".sidebar__item")
    links.forEach(link => {
      if (link.classList.contains("_active")) {
        link.classList.remove("_active")
      }
    })
  }

  const setActiveLinkByName = (activeSideBarLinkName) => {
    clearLinks()

    const linkActive = document.querySelector(`[data-name=${activeSideBarLinkName}]`)
    linkActive.classList.add("_active")
  }

  useEffect(() => {
    if (currentPageName) {
      setActiveLinkByName(currentPageName)
    }
  }, [currentPageName])

  return (
    <aside className={`sidebar ${isOpenSidebar ? "_open" : ""}`}>
      <ul className="sidebar__list">
        <li className="sidebar__item" data-name="Новости">
          <Link to={'/admin/news'} className='sidebar__link'>
            Новости
          </Link>
        </li>
        <li className="sidebar__item" data-name="Партнеры">
          <Link to={'/admin/partners'} className='sidebar__link'>
            Партнеры
          </Link>
        </li>
        <li className="sidebar__item" data-name="Объявления">
          <Link to={'/admin/advertisings'} className='sidebar__link'>
            Объявления
          </Link>
        </li>
        <li className="sidebar__item" data-name="Контакты">
          <Link to={'/admin/contacts'} className='sidebar__link'>
            Контакты
          </Link>
        </li>
        <li className="sidebar__item" data-name="Страницы">
          <Link to={'/admin/pages'} className='sidebar__link'>
            Страницы
          </Link>
        </li>
        <li className="sidebar__item" data-name="ОбМАДИ">
          <Link to={'/admin/about'} className='sidebar__link'>
            Об МАДИ
          </Link>
        </li>
      </ul>
    </aside>
  )
}

export default Sidebar