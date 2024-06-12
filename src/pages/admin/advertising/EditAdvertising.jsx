import { Controller, useForm } from "react-hook-form";
import { useFetching } from "../../../hooks/useFetching";
import { useLocation, useNavigate } from "react-router-dom";
import AdvertisingService from "../../../api/AdvertisingService";
import FileModelService from "../../../api/FileModelService"

const EditAdvertising = () => {
  const redirect = useNavigate()
  const location = useLocation()
  const editedAdvertising = location.state

  // const [deleteFileOnServer, isDeleteFileLoading, deleteFileErr] = useFetching(
  //   async (fileModelId) => {
  //     const response = await FileModelService.deleteFileOnServer(fileModelId);
  //     if (response.status == 200) {
  //       alert("Удаление файла прошло успешно!");
  //     } else if (response.status == 401) {
  //       alert("Срок действия текущей сессии истек. Попробуйте войти заново")
  //     }
  //   }
  // );

  const [addFileToAdvertising, isAddFileLoading, addFileErr] =
    useFetching(async (formData) => {
      const response = await AdvertisingService.addFileToAdvertising(
        formData
      );
      if (response.status == 200) {
        alert("Объявление успешно обновлено!");
        redirect("/admin/advertisings");
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
        alert("Объявление успешно обновлено!");
        redirect("/admin/advertisings");
      }
    } else if (response.status == 401) {
      alert("Срок действия текущей сессии истек. Попробуйте войти заново")
    }
  })

  
  const {control, handleSubmit, watch } = useForm({
    mode: "onSubmit",
    defaultValues: {
        title: editedAdvertising.title || "",
        mainText: editedAdvertising.mainText || "",
        link: editedAdvertising.buttonLink,
        isInSlider: editedAdvertising.mainSliderIsVisible,
        isDeleteFileOnServer: false
    }
  })

  const watchFileModel = watch("fileModel", null)
  const watchIsInSlider = watch("isInSlider", editedAdvertising.mainSliderIsVisible)


  const onEdit = (data) => {
    const newAdvertising = {
      id: editedAdvertising.id,
      title: data.title,
      mainText: data.mainText,
      createDate: editedAdvertising.createDate,
      buttonLink: data.link,
      mainSliderIsVisible: data.isInSlider,
      avatarFileName: editedAdvertising.avatarFileName
    }

    if (data.isInSlider) {
      newAdvertising.mainText = data.mainText
      newAdvertising.title = data.title
    }

    editAdvertising(newAdvertising, data.fileModel, data.isDeleteFileOnServer)
  }

  return (
    <section>
      <div className="container">
        <h1 className="admin-title title">Изменение объявления</h1>
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
                required: watchIsInSlider,
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
                required: watchIsInSlider,
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
          <label className="form__label form__label_checkbox">
            <span className="form__text">В слайдере на главной странице? </span>
            <Controller
              control={control}
              name="isInSlider"
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
            disabled={isEditLoading || isAddFileLoading}
          >
            {isEditLoading || isAddFileLoading ? "Изменение..." : "Изменить"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default EditAdvertising;
