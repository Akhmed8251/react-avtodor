import { Controller, useForm } from "react-hook-form";
import { useFetching } from "../../../hooks/useFetching";
import { useLocation, useNavigate } from "react-router-dom";
import MenuService from "../../../api/MenuService";
import Select from "../../../components/ui/Select";
import { useState, useEffect } from "react";
import MainMenuService from "../../../api/MainMenuService";

const CreateMenu = () => {
  const {state: menuId} = useLocation()

  const redirect = useNavigate()

  const [createMenu, isCreateLoading, createErr] = useFetching(async (mainMenu) => {
    const response = await MenuService.createMenu(mainMenu)
    if (response.status == 200) {
      alert("Дочернее меню успешно создано!")
      redirect("/admin/all-menu")
    } else if (response.status == 401) {
      alert("Срок действия текущей сессии истек. Попробуйте войти заново")
    }
  })

  const [mainMenuList, setMainMenuList] = useState([])
  const [getMainMenuList, isMainMenuLoading] = useFetching(async () => {
      const response = await MainMenuService.getMainMenu()
      if (response.status === 200) {
        let dataArr = []
        response.data.forEach(dataItem => {
            dataArr.push({
                value: dataItem.id,
                label: dataItem.name
            })
        })
        setMainMenuList(dataArr)
      } else if (response.status == 401) {
        alert("Срок действия текущей сессии истек. Попробуйте войти заново")
      }
  })

  const [menuList, setMenuList] = useState([])
  const [getMenuList, isMenuLoading] = useFetching(async () => {
      const response = await MenuService.getMenu()
      if (response.status === 200) {
        const menu = response.data.find(x => x.id == menuId)
        const parentMenu = response.data.find(x => x.id == menu.menuId)
        if (parentMenu?.menuId != null) {
          alert("Создание дочернего меню превышает допустимый уровень вложенности меню!")
          redirect("/admin/all-menu")
        }
        
        let dataArr = []
        response.data.forEach(dataItem => {
          if (dataItem.menuId != null) {
            const parentMenu = response.data.find(x => x.id == dataItem.menuId)
            if (parentMenu.menuId == null) {
              dataArr.push({
                value: dataItem.id,
                label: dataItem.name
              })
            }
          } else {  
            dataArr.push({
              value: dataItem.id,
              label: dataItem.name
            })
          }
        })
        setMenuList(dataArr)
      } else if (response.status == 401) {
        alert("Срок действия текущей сессии истек. Попробуйте войти заново")
      }
  })

  
  const {control, handleSubmit } = useForm({
    mode: "onSubmit",
    defaultValues: {
      menuId: menuId
    }
  })

  const onCreate = (data) => {
    const newMenu = {
        name: data.title,
        link: data.link,
        isDeleted: false
    }

    if (menuId) {
      newMenu.menuId = data.menuId
      
    } else {
      newMenu.mainMenuId = data.mainMenuId
    }

    createMenu(newMenu)
  }

  useEffect(() => {
    if (menuId) {
      getMenuList()
    } else {
      getMainMenuList()
    }
  }, [])

  return (
    <section>
      <div className="container">
        <h1 className="admin-title title">Создание дочернего меню</h1>
        <form
          action="#"
          className="form"
          onSubmit={handleSubmit(onCreate)}
          encType="multipart/form-data"
        >
          {
            menuId 
            ?
            <label className="form__label">
              <span className="form__text">Родительское меню</span>
              <Controller
                control={control}
                name="menuId"
                rules={{
                  required: true,
                }}
                render={({ field: { value, onChange }, fieldState: { error } }) => (
                  <div className={`${error ? "error" : ""}`}>
                    <Select
                      value={menuList.find(m => m.value == value)}
                      placeholder="Введите меню"
                      options={menuList}
                      isDisabled={isMenuLoading}
                      isLoading={isMenuLoading}
                      onChange={(newValue) => onChange(newValue.value)}
                    />
                  </div>
                )}
              />
            </label>
            :
            <label className="form__label">
              <span className="form__text">Родительское главное меню</span>
              <Controller
                control={control}
                name="mainMenuId"
                rules={{
                  required: true,
                }}
                render={({ field: { onChange }, fieldState: { error } }) => (
                  <div className={`${error ? "error" : ""}`}>
                    <Select
                      placeholder="Введите меню"
                      options={mainMenuList}
                      isDisabled={isMainMenuLoading}
                      isLoading={isMainMenuLoading}
                      onChange={(newValue) => onChange(newValue.value)}
                    />
                  </div>
                )}
              />
            </label>
          }  
          
          <label className="form__label">
            <span className="form__text">Название</span>
            <Controller
              control={control}
              name="title"
              rules={{
                required: true,
              }}
              render={({ field: { onChange }, fieldState: { error } }) => (
                <input
                  type="text"
                  className={`form__input ${error ? " error" : ""}`}
                  onChange={(newValue) => onChange(newValue)}
                />
              )}
            />
          </label>
          <label className="form__label">
            <span className="form__text">Ссылка (не должна быть равна названию одной из зарезервированных папок: bvi, fonts, Files, images, js, ckeditor)</span>
            <Controller
              control={control}
              name="link"
              rules={{
                required: true,
                pattern: /^(?!bvi$|\/bvi$|bvi\/$|\/bvi\/$|Files$|\/Files$|Files\/$|\/Files\/$|fonts$|\/fonts$|fonts\/$|\/fonts\/$|images$|\/images$|images\/$|\/images\/$|js$|\/js$|js\/$|\/js\/$|ckeditor$|\/ckeditor$|ckeditor\/$|\/ckeditor\/$).*$/i
              }}
              render={({ field: { onChange }, fieldState: { error } }) => (
                <input
                  type="text"
                  className={`form__input ${error ? " error" : ""}`}
                  onChange={(newValue) => onChange(newValue)}
                />
              )}
            />
          </label>    
          <button
            className={`form__btn btn`}
            disabled={isCreateLoading}
          >
            {isCreateLoading ? "Создание..." : "Создать"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default CreateMenu;
