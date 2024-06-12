import { Controller, useForm } from "react-hook-form";
import { useFetching } from "../../../hooks/useFetching";
import { useLocation, useNavigate } from "react-router-dom";
import AdvertisingService from "../../../api/AdvertisingService";

const EditAbout = () => {
  const redirect = useNavigate()
  const location = useLocation()
  const editedAbout = location.state

  const [addFileToAdvertising, isAddFileLoading, addFileErr] =
    useFetching(async (formData) => {
      const response = await AdvertisingService.addFileToAdvertising(
        formData
      );
      if (response.status == 200) {
        alert("Информация об МАДИ успешно обновлена и изменен файл!");
        redirect("/admin/about");
      } else if (response.status == 401) {
        alert("Срок действия текущей сессии истек. Попробуйте войти заново")
      }
    });

  const [editAdvertising, isEditLoading, editErr] = useFetching(async (advertising, file = null, isDeleteFileOnServer) => {
    const response = await AdvertisingService.editAdvertising(advertising)
    if (response.status == 200) {
      if (file) {
        const formData = new FormData()
        formData.append("advertisingId", advertising.id)
        formData.append("formFile", file)
        formData.append("isDeleteOldFile", isDeleteFileOnServer)

        addFileToAdvertising(formData)
      } else {
        alert("Информация об МАДИ успешно обновлена!");
        redirect("/admin/about");
      }
    } else if (response.status == 401) {
      alert("Срок действия текущей сессии истек. Попробуйте войти заново")
    }
  })

  
  const {control, handleSubmit, watch } = useForm({
    mode: "onSubmit",
    defaultValues: {
        title: editedAbout.title || "",
        mainText: editedAbout.mainText || "",
        link: editedAbout.buttonLink,
        buttonText: editedAbout.buttonText,
        isDeleteFileOnServer: false
    }
  })

  const watchFileModel = watch("fileModel", null)

  const onEdit = (data) => {
    const newAdvertising = {
      id: editedAbout.id,
      mainText: data.mainText,
      title: data.title,
      buttonText: data.buttonText,
      buttonLink: data.link,
      avatarFileName: editedAbout.avatarFileName,
      createDate: editedAbout.createDate,
      mainSliderIsVisible: false,
      mainPageDownIsVisible: true,
      isDeleted: false,
      content: null
    }
    
    editAdvertising(newAdvertising, data.fileModel, data.isDeleteFileOnServer)
  }

  return (
    <section>
      <div className="container">
        <h1 className="admin-title title">Изменение информации об МАДИ</h1>
        <form
          action="#"
          className="form"
          onSubmit={handleSubmit(onEdit)}
          encType="multipart/form-data"
        >
          <label className="form__label">
            <span className="form__text">Заголовок</span>
            <Controller
              control={control}
              name="title"
              rules={{
                required: true,
              }}
              render={({ field: { value, onChange }, fieldState: { error } }) => (
                <input
                  type="text"
                  value={value}
                  className={`form__input ${error ? " error" : ""}`}
                  onChange={(newValue) => onChange(newValue)}
                />
              )}
            />
          </label>
          <label className="form__label">
            <span className="form__text">Главный текст</span>
            <Controller
              control={control}
              name="mainText"
              rules={{
                required: true,
              }}
              render={({ field: { value, onChange }, fieldState: { error } }) => (
                <input
                  type="text"
                  value={value}
                  className={`form__input ${error ? " error" : ""}`}
                  onChange={(newValue) => onChange(newValue)}
                />
              )}
            />
          </label>
          <label className="form__label">
            <span className="form__text">Текст кнопки</span>
            <Controller
              control={control}
              name="buttonText"
              rules={{
                required: true,
              }}
              render={({ field: { value, onChange }, fieldState: { error } }) => (
                <input
                  type="text"
                  value={value}
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
              render={({ field: { value, onChange }, fieldState: { error } }) => (
                <input
                  type="text"
                  value={value}
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
                  onChange={(newValue) => onChange(newValue.target.files[0])}
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
            disabled={isEditLoading || isAddFileLoading}
          >
            {isEditLoading || isAddFileLoading  ? "Изменение..." : "Изменить"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default EditAbout;
