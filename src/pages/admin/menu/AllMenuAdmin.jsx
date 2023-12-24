import { useState, useContext, useEffect } from "react";
import { AdminContext } from "../../../context";
import { Link } from "react-router-dom";
import MainMenuService from "../../../api/MainMenuService";
import MenuService from "../../../api/MenuService";
import { useFetching } from "../../../hooks/useFetching";
import Loader from "../../../components/ui/Loader";
import { formatTime } from "../../../utils/time";
import Popup from "../../../components/ui/Popup";

const AllMenuAdmin = () => {
  const { setCurrentPageName } = useContext(AdminContext)

  const [modalConfirmDeleteMainMenuActive, setModalConfirmDeleteMainMenuActive] = useState(false)
  const [modalConfirmDeleteMenuActive, setModalConfirmDeleteMenuActive] = useState(false)

  const [menuId, setMenuId] = useState(null)

  const [mainMenuList, setMainMenuList] = useState([])
  const [getMainMenuList, isMainMenuLoading, mainMenuErr] = useFetching(async () => {
      const response = await MainMenuService.getMainMenu()
      if (response.status === 200) {
          setMainMenuList(response.data)
      } else {
          console.log(mainMenuErr)
      }
  })

  const [menuList, setMenuList] = useState([])
  const [getMenuList, isMenuLoading, menuErr] = useFetching(async () => {
      const response = await MenuService.getMenu()
      if (response.status === 200) {
          setMenuList(response.data)
      } else {
          console.log(menuErr)
      }
  })

  const [deleteMainMenu, isDeleteMainMenuLoading, deleteMainMenuErr] = useFetching(async (menuId) => {
    const response = await MainMenuService.deleteMainMenu(menuId)
    if (response.status == 200) {
      alert("Меню успешно удалено!");
      closeModalConfirmDeleteMainMenu()
      deleteMenuFromTable(menuId)
    } else {
      console.log(deleteMainMenuErr);
    }
  });

  const [deleteMenu, isDeleteMenuLoading, deleteMenuErr] = useFetching(async (menuId) => {
    const response = await MenuService.deleteMenu(menuId)
    if (response.status == 200) {
      alert("Меню успешно удалено!");
      closeModalConfirmDeleteMenu()
      deleteMenuFromTable(menuId)
    } else {
      console.log(deleteMenuErr);
    }
  });

  const closeModalConfirmDeleteMainMenu = () => {
    setMenuId(null); 
    setModalConfirmDeleteMainMenuActive(false)
  }

  const closeModalConfirmDeleteMenu = () => {
    setMenuId(null); 
    setModalConfirmDeleteMenuActive(false)
  }

  const deleteMenuFromTable = (id) => {
    document.querySelector(`[data-id='${id}'`).remove()
  }

  const getParentMenuName = (menuId) => {
    const mainMenu = mainMenuList.find(m => m.id == menuId)
    if (mainMenu != null) {
      return mainMenu.name
    }
      
    return " - "
  }

  useEffect(() => {
    setCurrentPageName("Меню")
    getMainMenuList()
    getMenuList()
  }, [])

  return (
    <>
      <section>
        <h1 className="admin-title title">Меню</h1>
        <Link to={"/admin/main-menu/create"} className="create btn">
          Создать меню
        </Link>
        <Link to={"/admin/menu/create"} className="create btn">
          Создать дочернее меню
        </Link>
        {isMainMenuLoading && isMenuLoading ? (
          <Loader />
        ) : (
          <table>
            <thead>
              <tr>
                <th>Дата создания</th>
                <th>Название</th>
                <th>Ссылка</th>
                <th>Родительское меню</th>
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
                  <td>-</td>
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
              {menuList.map((menu, idx) => (
                <tr data-id={menu.id} key={idx}>
                  <td>{formatTime(menu.createDate)}</td>
                  <td>{menu.name}</td>
                  <td>
                    <a href={menu.link}>{menu.link}</a>
                  </td>
                  <td>{getParentMenuName(menu.mainMenuId)}</td>
                  <td className="actions">
                    <Link
                      to={"/admin/menu/edit"}
                      className="edit btn"
                      state={menu}
                    >
                      Изменить
                    </Link>
                    <button className="delete btn" onClick={() => { setMenuId(menu.id); setModalConfirmDeleteMenuActive(true) }}>
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
      <h2 className="popup__title title">Вы действительно хотите удалить меню?</h2>
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
      <Popup active={modalConfirmDeleteMenuActive} setActive={closeModalConfirmDeleteMenu}>
      <h2 className="popup__title title">Вы действительно хотите удалить дочернее меню?</h2>
        <div className="confirm-buttons">
          <button onClick={() => deleteMenu(menuId)} className='confirm-button confirm-button_yes' disabled={isDeleteMenuLoading} >
            {
              isDeleteMenuLoading ? <Loader isOnlySpinner/>
                :
                <span>Да</span>
            }
          </button>
          <button className="confirm-button confirm-button_no" onClick={closeModalConfirmDeleteMenu}>Нет</button>
        </div>
      </Popup>
    </>
  );
};

export default AllMenuAdmin;
