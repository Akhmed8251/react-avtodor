import { useState, useContext, useEffect } from "react";
import { AdminContext } from "../../../context";
import { Link } from "react-router-dom";
import MainMenuService from "../../../api/MainMenuService";
import MenuService from "../../../api/MenuService";
import { useFetching } from "../../../hooks/useFetching";
import Loader from "../../../components/ui/Loader";
import Popup from "../../../components/ui/Popup";
import { TreeTable } from 'primereact/treetable';
import { Column } from 'primereact/column';
import { formatTime } from "../../../utils/time";

const AllMenuAdmin = () => {
  const { setCurrentPageName } = useContext(AdminContext)

  const [modalConfirmDeleteMenuActive, setModalConfirmDeleteMenuActive] = useState(false)

  const [menuId, setMenuId] = useState(null)

  const [mainMenuHierarchicalList, setMainMenuHierarchicalList] = useState([])

  const [getMainMenuHierarchical, isMenuLoading, menuErr] = useFetching(async () => {
      const response = await MainMenuService.getMainMenuHierarchical()
      if (response.status === 200) {
        setMainMenuHierarchicalList(getDataForTreeTable(response.data.filter(x => x.childMenu.length > 0)))
      } else if (response.status == 401) {
        alert("Срок действия текущей сессии истек. Попробуйте войти заново")
      }
  })

  const [deleteMenu, isDeleteMenuLoading, deleteMenuErr] = useFetching(async (menuId) => {
    const response = await MenuService.deleteMenu(menuId)
    if (response.status == 200) {
      alert("Меню успешно удалено!");
      closeModalConfirmDeleteMenu()
      //deleteMenuFromTable(menuId)
      getMainMenuHierarchical()
    } else if (response.status == 401) {
      alert("Срок действия текущей сессии истек. Попробуйте войти заново")
    }
  });

  const closeModalConfirmDeleteMenu = () => {
    setMenuId(null); 
    setModalConfirmDeleteMenuActive(false)
  }

  const getDataForTreeTable = (mainMenuList) => {
    const res = []
    for (let mainMenu of mainMenuList) {
        res.push(getTreeDataForMenu(mainMenu.childMenu, mainMenu.name))
    }
    console.log(res.flat())
    return res.flat()
  }

  const getTreeDataForMenu = (menuList, mainMenuName = " - ") => {
  const res = []

  for (let i = 0; i < menuList.length; i++) {
      const el = {
          key: menuList[i].id,
          data: {
              id: menuList[i].id,
              name: menuList[i].name,
              link: menuList[i].link,
              mainMenuName: mainMenuName,
              createDate: formatTime(menuList[i].createDate),
              menuEntity: menuList[i]
          },
          children: (menuList[i].childMenus && menuList[i].childMenus?.length > 0) ? getTreeDataForMenu(menuList[i].childMenus) : null
      }
      el.children == null && delete el.children
      res.push(el)
  }

  return res
  }

  const actionTemplate = (node) => {
    return (
      <div className="actions">
        <Link
            to={"/admin/menu/create"}
            className={`create btn`}
            state={node.data.id}
        >
            Создать дочернее меню
        </Link>
        <Link
            to={`/admin/menu/edit`}
            className="edit btn"
            state={node.data.menuEntity}
        >
            Изменить
        </Link>
        <button className="delete btn" onClick={() => { setMenuId(node.data.id); setModalConfirmDeleteMenuActive(true) }}>
            Удалить
        </button>
      </div> 
    )
  }

  const linkTemplate = (node) => {
    return (
      <a href={node.data.link}>{node.data.link}</a>
    )
  }

  // const deleteMenuFromTable = (id) => {
  //   document.querySelector(`[data-id='${id}'`).remove()
  // }

  // const checkMenuOnDeepLevel = () => {
  //   const menus = mainMenuHierarchicalList.map(x => x.childMenu)
  //   const disabedMenuIds = []
  //   menus.forEach(menu => {
  //     if (menu.childMenus) {
  //       const childMenuElements = menu.childMenus
  //       childMenuElements.forEach(childMenuEl => {
  //         if (childMenuEl.childMenus) {
  //           childMenuEl.childMenus.forEach(childMenuChildEl => {
  //             disabedMenuIds.push(childMenuChildEl.id)
  //           })
  //         }
  //       })
  //     }
  //   })

  //   if (disabedMenuIds.length > 0) {
  //     disabedMenuIds.forEach(disabledMenuId => {
  //       const disabledMenuEl = document.querySelector(`tr[data-id='${disabledMenuId}']`)
  //       const createChildBtn = disabledMenuEl.querySelector(".create")
  //       createChildBtn.classList.add("disabled")
  //     })
  //   } else {
  //     console.log(menus)
  //   }
  // }

  useEffect(() => {
    setCurrentPageName("Меню")
    getMainMenuHierarchical()
    // !isMenuLoading && checkMenuOnDeepLevel()
  }, [])

  return (
    <>
      <section>
        <h1 className="admin-title title">Меню</h1>
        <Link to={"/admin/menu/create"} className="create btn">
          Создать дочернее меню для главного меню
        </Link>
        {isMenuLoading ? (
          <Loader />
        ) : (
          // <table>
          //   <thead>
          //     <tr>
          //       <th>Дата создания</th>
          //       <th>Название</th>
          //       <th>Ссылка</th>
          //       <th>Родительское главное меню</th>
          //       <th>Родительское меню</th>
          //       <th>Действия</th>
          //     </tr>
          //   </thead>
          //   <tbody>
          //     {
          //       mainMenuHierarchicalList.map((menu) => (
          //         <TreeForTableMenu isMainMenuChild={true} treeData={menu.childMenu} deleteFn={(nodeId) => { setMenuId(nodeId); setModalConfirmDeleteMenuActive(true) }} parentMenuName={menu.name}  />
          //       ))
          //     }
          //   </tbody>
          // </table>
          <TreeTable value={mainMenuHierarchicalList} tableStyle={{ minWidth: '50rem' }}>
            <Column field="name" header="Название" expander></Column>
            <Column field="link" header="Ссылка" body={linkTemplate}></Column>
            <Column field="mainMenuName" header="Родительское главное меню"></Column>
            <Column field="createDate" header="Дата создания"></Column>
            <Column body={actionTemplate}></Column>
          </TreeTable>
        )}
      </section>
      <Popup active={modalConfirmDeleteMenuActive} setActive={closeModalConfirmDeleteMenu}>
      <h2 className="popup__title title">Вы действительно хотите удалить меню?</h2>
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
