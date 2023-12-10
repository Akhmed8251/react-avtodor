import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { AdminContext } from '../../context'

const Sidebar = ({ activeSideBarLinkName }) => {  
  const { isOpenSidebar } = useContext(AdminContext)

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
    if (activeSideBarLinkName) {
      setActiveLinkByName(activeSideBarLinkName)
    }
  }, [])

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
      </ul>
    </aside>
  )
}

export default Sidebar