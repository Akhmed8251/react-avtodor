import React, { useContext } from 'react'
import { AdminContext } from '../../context'


const HeaderAdmin = () => {
  const { isOpenSidebar, setIsOpenSidebar, setIsAuth, setIsAdminViewPublicPage, employeeName, setEmployeeName } = useContext(AdminContext)
  
  const logout = () => {
    localStorage.clear()
    setIsAuth(false)
    setIsAdminViewPublicPage(false)
    setEmployeeName(null)
  }

  return (
    <header className="admin-header">
        <div className="admin-header__container container">
            <div className="admin-header__content">
                <a href="/" className="admin-header__logo logo">
                    MfMadi<span>Admin</span>
                </a>
                <button className={`admin-header__sidebar-btn ${isOpenSidebar ? "_close" : ""}`} onClick={() => setIsOpenSidebar(prev => !prev)}></button>
                <a href="/" className='admin-name' onClick={() => { localStorage.setItem("isAdminViewPublicPage", "true"); setIsAdminViewPublicPage(true) }}>{employeeName}</a>
                <a href='/' className='btn logout-btn' onClick={() => logout()}>Выйти</a>
            </div>
        </div>
    </header>
  )
}

export default HeaderAdmin