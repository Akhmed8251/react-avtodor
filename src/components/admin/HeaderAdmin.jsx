import React, { useContext } from 'react'
import { AdminContext } from '../../context'

const HeaderAdmin = () => {
  const { isOpenSidebar, setIsOpenSidebar } = useContext(AdminContext)
  return (
    <header className="admin-header">
        <div className="admin-header__container container">
            <div className="admin-header__content">
                <a href="/" className="admin-header__logo logo">
                    MfMadi<span>Admin</span>
                </a>
                <button className={`admin-header__sidebar-btn ${isOpenSidebar ? "_close" : ""}`} onClick={() => setIsOpenSidebar(prev => !prev)}></button>
            </div>
        </div>
    </header>
  )
}

export default HeaderAdmin