import { Controller, useForm } from "react-hook-form";
import { useFetching } from "../../../hooks/useFetching";
import { useLocation, useNavigate } from "react-router-dom";
import MainMenuService from "../../../api/MainMenuService";
import MenuService from "../../../api/MenuService";
import Select from "../../../components/ui/Select";
import { useState, useEffect } from "react";

const EditMenu = () => {
  const redirect = useNavigate()
  const location = useLocation()
  const editedMenu = location.state

  const [editMenu, isEditLoading, createErr] = useFetching(async (mainMenu) => {
    const response = await MenuService.editMenu(mainMenu)
    if (response.status == 200) {
      alert("Дочернее меню успешно изменено!")
      redirect("/admin/all-menu")
    } else if (response.status == 401) {
      alert("Срок действия текущей сессии истек. Попробуйте войти заново")
    }
  })

  const [mainMenuList, setMainMenuList] = useState([])
  const [getMainMenuList, isMainMenuLoading, mainMenuErr] = useFetching(async () => {
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

  
  const {control, handleSubmit } = useForm({
    mode: "onSubmit",
    defaultValues: {
      title: editedMenu.name,
      link: editedMenu.link,
      mainMenuId: editedMenu.mainMenuId
    }
  })

  const onEdit = (data) => {
    const newMenu = {
        id: editedMenu.id,
        name: data.title,
        link: data.link,
        createDate: editedMenu.createDate,
        mainMenuId: data.mainMenuId,
        isDeleted: false
    }

    editMenu(newMenu)
  }

  useEffect(() => {
    getMainMenuList()
  }, [])

  return (
    <section>
      <div className="container">
        <h1 className="admin-title title">Изменение дочернего меню</h1>
        <form
          action="#"
          className="admin-login__form form"
          onSubmit={handleSubmit(onEdit)}
          encType="multipart/form-data"
        >
          <label className="form__label">
            <span className="form__text">Родительское меню</span>
            <Controller
              control={control}
              name="mainMenuId"
              rules={{
                required: true,
              }}
              render={({ field: { value, onChange }, fieldState: { error } }) => (
                <div className={`${error ? "error" : ""}`}>
                  <Select
                    value={mainMenuList.find(m => m.value == value)}
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
          <label className="form__label">
            <span className="form__text">Название</span>
            <Controller
              control={control}
              name="title"
              rules={{
                required: true,
              }}
              render={({ field: { value, onChange }, fieldState: { error } }) => (
                <input
                  value={value}
                  type="text"
                  className={`form__input ${error ? " error" : ""}`}
                  onChange={(newValue) => onChange(newValue)}
                />
              )}
            />
          </label>
          <label className="form__label">
            <span className="form__text">Ссылка (не должна быть равна: bvi, fonts, Files, images, js)</span>
            <Controller
              control={control}
              name="link"
              rules={{
                required: true,
                pattern: /^(?!bvi$|\/bvi$|bvi\/$|\/bvi\/$|Files$|\/Files$|Files\/$|\/Files\/$|fonts$|\/fonts$|fonts\/$|\/fonts\/$|images$|\/images$|images\/$|\/images\/$|js$|\/js$|js\/$|\/js\/$).*$/
              }}
              render={({ field: { value, onChange }, fieldState: { error } }) => (
                <input
                  value={value}
                  type="text"
                  className={`form__input ${error ? " error" : ""}`}
                  onChange={(newValue) => onChange(newValue)}
                />
              )}
            />
          </label>    
          <button
            className={`form__btn btn`}
            disabled={isEditLoading}
          >
            {isEditLoading ? "Изменение..." : "Изменить"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default EditMenu;
