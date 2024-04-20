import { Controller, useForm } from "react-hook-form";
import PartnersService from "../../../api/PartnersService";
import { useFetching } from "../../../hooks/useFetching";
import { useLocation, useNavigate } from "react-router-dom";

const EditPartner = () => {
  const location = useLocation()
  const editedPartner = location.state
  const redirect = useNavigate()

  const [editPartner, isEditLoading, createErr] = useFetching(async (formData) => {
    const response = await PartnersService.editPartner(formData)
    if (response.status == 200) {
        alert("Партнер успешно обновлен!")
        redirect('/admin/partners')
    } else if (response.status == 401) {
      alert("Срок действия текущей сессии истек. Попробуйте войти заново")
    }
  })

  
  const {control, handleSubmit, watch} = useForm({
    mode: "onSubmit",
    defaultValues: {
      name: editedPartner.name,
      link: editedPartner.link,
      isDeleteFileOnServer: false
    }
  })

  const watchFileModel = watch("fileModel", null)


  const onEdit = (data) => {
    const formData = new FormData()
    formData.append("partnerId", editedPartner.id)
    formData.append("name", data.name)
    formData.append("link", data.link)
    formData.append("isDeleteOldFile", data.isDeleteFileOnServer)
    
    if (data.fileModel) {
      formData.append("formFile", data.fileModel[0])
    }

    editPartner(formData)
  }

  return (
    <section>
      <div className="container">
        <h1 className="admin-title title">Изменение партнера</h1>
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
              name="name"
              rules={{
                required: true
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
          <label className="form__label">
            <span className="form__text">Изображение</span>
            <Controller
              control={control}
              name="fileModel"
              render={({ field: { onChange }, fieldState: { error } }) => (
                <input
                  type="file"
                  accept=".jpg, .jpeg,.png, .svg, .webp, .avif"
                  className={`form__input ${error ? " error" : ""}`}
                  onChange={(newValue) => onChange(newValue.target.files)}
                />
              )}
            />
          </label>
          {
            watchFileModel
              &&
              <label className="form__label form__label_checkbox">
                <span className="form__text">Удалить текущее изображение с сервера</span>
                <Controller
                  control={control}
                  name="isDeleteFileOnServer"
                  render={({ field: { onChange }, fieldState: { error } }) => (
                    <input
                      type="checkbox"
                      className={`form__input ${error ? " error" : ""}`}
                      onChange={(newValue) => onChange(newValue.target.checked)}
                    />
                  )}
                />
              </label>
          }
          <button
            className={`form__btn btn`}
            disabled={isEditLoading}
          >
            {isEditLoading  ? "Изменение..." : "Изменить"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default EditPartner;
