import React, { useContext, useEffect, useState } from 'react'
import { AdminContext } from '../../../context'
import { useFetching } from '../../../hooks/useFetching'
import EmployeeService from '../../../api/EmployeeService'
import Loader from '../../../components/ui/Loader'
import Popup from '../../../components/ui/Popup'
import { Link } from 'react-router-dom'

const UsersAdmin = () => {
  const {setCurrentPageName} = useContext(AdminContext)

  const [modalConfirmDeleteActive, setModalConfirmDeleteActive] = useState(false)

  const [users, setUsers] = useState([])
  const [userId, setUserId] = useState(null)
  const [getUsers, isUsersLoading, loadingErr] = useFetching(async () => {
    const response = await EmployeeService.getUsers()

    if (response.status == 200) {
      setUsers(response.data)
    } else if (response.status == 401) {
      alert("Срок действия текущей сессии истек. Попробуйте войти заново")
    }
  })

  const [deleteUser, isDeleteUserLoading, deleteErr] = useFetching(async (userId) => {
    const response = await EmployeeService.deleteUser(userId)

    if (response.status == 200) {
      alert("Пользователь успешно удален!");
      closeModalConfirmDelete()
      deleteUserFromTable(userId)
    } else if (response.status == 401) {
      alert("Срок действия текущей сессии истек. Попробуйте войти заново")
    }
  })

  const closeModalConfirmDelete = () => {
    setUserId(null); 
    setModalConfirmDeleteActive(false)
  }

  const deleteUserFromTable = (id) => {
    document.querySelector(`[data-id='${id}'`).remove()
  }

  useEffect(() => {
    setCurrentPageName("Пользователи")
    getUsers()
  }, [])

  return (
    <>
      <section>
        <h1 className="admin-title title">Пользователи</h1>
        <Link to={"/admin/user/create"} className="create btn">
          Создать
        </Link>
        {isUsersLoading ? (
          <Loader />
        ) : (
          <table>
            <thead>
              <tr>
                <th>Имя пользователя</th>
                <th>Роль</th>
                <th>Действия</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, idx) => (
                <tr data-id={user.id} key={idx}>
                  <td>{user.name}</td>
                  <td>{user.role.name == "admin" ? "Администратор" : "Сотрудник"}</td>
                  <td className="actions">
                    <Link
                      to={"/admin/user/edit"}
                      className="edit btn"
                      state={user}
                    >
                      Изменить
                    </Link>
                    <button className="delete btn" onClick={() => { setUserId(user.id); setModalConfirmDeleteActive(true) }}>
                      Удалить
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
      <Popup active={modalConfirmDeleteActive} setActive={closeModalConfirmDelete}>
      <h2 className="popup__title title">Вы действительно хотите удалить пользователя?</h2>
        <div className="confirm-buttons">
          <button onClick={() => {
            if (users.length > 1) {
              deleteUser(userId)
            } else {
              alert("Нельзя удалить единственного пользователя системы")
            }
          }} className='confirm-button confirm-button_yes' disabled={isDeleteUserLoading} >
            {
              isDeleteUserLoading ? <Loader isOnlySpinner/>
                :
                <span>Да</span>
            }
          </button>
          <button className="confirm-button confirm-button_no" onClick={closeModalConfirmDelete}>Нет</button>
        </div>
      </Popup>
    </>
  )
}

export default UsersAdmin