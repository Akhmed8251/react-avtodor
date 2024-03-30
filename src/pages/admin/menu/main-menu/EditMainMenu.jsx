import { Controller, useForm } from "react-hook-form";
import { useFetching } from "../../../../hooks/useFetching";
import { useLocation, useNavigate } from "react-router-dom";
import MainMenuService from "../../../../api/MainMenuService";

const EditMainMenu = () => {
  const redirect = useNavigate()
  const location = useLocation()
  const editedMainMenu = location.state

  const [editMainMenu, isEditLoading, createErr] = useFetching(async (mainMenu) => {
    const response = await MainMenuService.editMainMenu(mainMenu)
    if (response.status == 200) {
      alert("Меню успешно изменено!")
      redirect("/admin/all-menu")
    } else {
      console.log(createErr)
    }
  })

  
  const {control, handleSubmit } = useForm({
    mode: "onSubmit",
    defaultValues: {
      title: editedMainMenu.name,
      link: editedMainMenu.link,
      topMainPageIsVisible: editedMainMenu.topMainPageIsVisible,
      sideMenuIsVisible: editedMainMenu.sideMenuIsVisible,
      menuAboveAdvertisingIsVisible: editedMainMenu.menuAboveAdvertisingIsVisible,
    }
  })

  const onEdit = (data) => {
    const newMainMenu = {
      id: editedMainMenu.id,
      name: data.title,
      link: data.link,
      topMainPageIsVisible: data.topMainPageIsVisible,
      sideMenuIsVisible: data.sideMenuIsVisible,
      menuAboveAdvertisingIsVisible: data.menuAboveAdvertisingIsVisible,
      createDate: editedMainMenu.createDate,
      isDeleted: false
    }

    editMainMenu(newMainMenu)
  }

  return (
    <section>
      <div className="container">
        <h1 className="admin-title title">Изменение меню</h1>
        <form
          action="#"
          className="admin-login__form form"
          onSubmit={handleSubmit(onEdit)}
          encType="multipart/form-data"
        >
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
            <span className="form__text">Ссылка</span>
            <Controller
              control={control}
              name="link"
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
          <span className="form__info">Расположение меню на сайте (если ничего не выбрать, то отображается в подвале сайта)</span>
          <label className="form__label form__label_checkbox">
            <span className="form__text">В шапке и подвале сайта (напротив логотипа)</span>
            <Controller
              control={control}
              name="topMainPageIsVisible"
              render={({ field: { value, onChange }, fieldState: { error } }) => (
                <input
                  checked={value}
                  type="checkbox"
                  className={`form__input ${error ? " error" : ""}`}
                  onChange={(newValue) => onChange(newValue.target.checked)}
                />
              )}
            />
          </label>
          <label className="form__label form__label_checkbox">
            <span className="form__text">Боковое меню</span>
            <Controller
              control={control}
              name="sideMenuIsVisible"
              render={({ field: { value, onChange }, fieldState: { error } }) => (
                <input
                  checked={value}
                  type="checkbox"
                  className={`form__input ${error ? " error" : ""}`}
                  onChange={(newValue) => onChange(newValue.target.checked)}
                />
              )}
            />
          </label>
          <label className="form__label form__label_checkbox">
            <span className="form__text">Над слайдером объявления</span>
            <Controller
              control={control}
              name="menuAboveAdvertisingIsVisible"
              render={({ field: { value, onChange }, fieldState: { error } }) => (
                <input
                  checked={value}
                  type="checkbox"
                  className={`form__input ${error ? " error" : ""}`}
                  onChange={(newValue) => onChange(newValue.target.checked)}
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

export default EditMainMenu;
