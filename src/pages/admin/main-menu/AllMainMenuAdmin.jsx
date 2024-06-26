import { useState, useContext, useEffect } from "react";
import { AdminContext } from "../../../context";
import { Link } from "react-router-dom";
import MainMenuService from "../../../api/MainMenuService";
import { useFetching } from "../../../hooks/useFetching";
import Loader from "../../../components/ui/Loader";
import { formatTime } from "../../../utils/time";
import Popup from "../../../components/ui/Popup";

const AllMainMenuAdmin = () => {
  const { setCurrentPageName } = useContext(AdminContext)

  const [modalConfirmDeleteMainMenuActive, setModalConfirmDeleteMainMenuActive] = useState(false)

  const [menuId, setMenuId] = useState(null)

  const [mainMenuList, setMainMenuList] = useState([])
  const [getMainMenuList, isMainMenuLoading, mainMenuErr] = useFetching(async () => {
      const response = await MainMenuService.getMainMenu()
      if (response.status === 200) {
          setMainMenuList(response.data)
      } else if (response.status == 401) {
        alert("Срок действия текущей сессии истек. Попробуйте войти заново")
      }
  })

  const [deleteMainMenu, isDeleteMainMenuLoading, deleteMainMenuErr] = useFetching(async (menuId) => {
    const response = await MainMenuService.deleteMainMenu(menuId)
    if (response.status == 200) {
      alert("Меню успешно удалено!");
      closeModalConfirmDeleteMainMenu()
      deleteMenuFromTable(menuId)
    } else if (response.status == 401) {
      alert("Срок действия текущей сессии истек. Попробуйте войти заново")
    }
  });

  const closeModalConfirmDeleteMainMenu = () => {
    setMenuId(null); 
    setModalConfirmDeleteMainMenuActive(false)
  }

  const deleteMenuFromTable = (id) => {
    document.querySelector(`[data-id='${id}'`).remove()
  }

  const getPosition = (menu) => {
    const resPositions = []

    if (!menu.topMainPageIsVisible && !menu.sideMenuIsVisible && !menu.menuAboveAdvertisingIsVisible) {
      return "В подвале сайта"
    }

    if (menu.topMainPageIsVisible) {
      resPositions.push("В шапке и подвале сайта (напротив логотипа)")
    }
    if (menu.sideMenuIsVisible) {
      resPositions.push("Боковое меню")
    }
    if (menu.menuAboveAdvertisingIsVisible) {
      resPositions.push("Над слайдером объявления")
    }
    
    return resPositions.join("; ")
  }

  useEffect(() => {
    setCurrentPageName("Главные-меню")
    getMainMenuList()
  }, [])

  return (
    <>
      <section>
        <h1 className="admin-title title">Главные меню</h1>
        <Link to={"/admin/main-menu/create"} className="create btn">
          Создать главное меню
        </Link>
        {isMainMenuLoading ? (
          <Loader />
        ) : (
          <table>
            <thead>
              <tr>
                <th>Дата создания</th>
                <th>Название</th>
                <th>Ссылка</th>
                <th>Расположение</th>
                <th>Действия</th>
              </tr>
            </thead>
            <tbody>
              {mainMenuList.map((menu, idx) => (
                <tr data-id={menu.id} key={idx}>
                  <td>{formatTime(menu.createDate)}</td>
                  <td>{menu.name}</td>
                  <td>
                    <a href={menu.link}>{menu.link}</a>
                  </td>
                  <td>{getPosition(menu)}</td>
                  <td className="actions">
                    <Link
                      to={"/admin/main-menu/edit"}
                      className="edit btn"
                      state={menu}
                    >
                      Изменить
                    </Link>
                    <button className="delete btn" onClick={() => { setMenuId(menu.id); setModalConfirmDeleteMainMenuActive(true) }}>
                      Удалить
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
      <Popup active={modalConfirmDeleteMainMenuActive} setActive={closeModalConfirmDeleteMainMenu}>
      <h2 className="popup__title title">Вы действительно хотите удалить главное меню?</h2>
        <div className="confirm-buttons">
          <button onClick={() => deleteMainMenu(menuId)} className='confirm-button confirm-button_yes' disabled={isDeleteMainMenuLoading} >
            {
              isDeleteMainMenuLoading ? <Loader isOnlySpinner/>
                :
                <span>Да</span>
            }
          </button>
          <button className="confirm-button confirm-button_no" onClick={closeModalConfirmDeleteMainMenu}>Нет</button>
        </div>
      </Popup>
    </>
  );
};

export default AllMainMenuAdmin;
