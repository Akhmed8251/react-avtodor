import React, { useContext } from 'react'
import { AdminContext } from '../../context'
import { useNavigate } from 'react-router-dom'

const HeaderAdmin = () => {
  const { isOpenSidebar, setIsOpenSidebar, setIsAuth } = useContext(AdminContext)
  const redirect = useNavigate()
  
  const logout = () => {
    localStorage.clear()
    setIsAuth(false)
    redirect('/')
  }

  return (
    <header className="admin-header">
        <div className="admin-header__container container">
            <div className="admin-header__content">
                <a href="/" className="admin-header__logo logo">
                    MfMadi<span>Admin</span>
                </a>
                <button className={`admin-header__sidebar-btn ${isOpenSidebar ? "_close" : ""}`} onClick={() => setIsOpenSidebar(prev => !prev)}></button>
                <button type='button' className='btn logout-btn' onClick={() => logout()}>Выйти</button>
            </div>
        </div>
    </header>
  )
}

export default HeaderAdmin