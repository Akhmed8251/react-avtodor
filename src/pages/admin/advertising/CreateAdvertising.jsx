import { Controller, useForm } from "react-hook-form";
import { useFetching } from "../../../hooks/useFetching";
import { useNavigate } from "react-router-dom";
import AdvertisingService from "../../../api/AdvertisingService";

const CreateAdvertising = () => {
  const redirect = useNavigate()

  const [addFileToAdvertising, isAddFileLoading, addFileErr] =
    useFetching(async (formData) => {
      const response = await AdvertisingService.addFileToAdvertising(
        formData
      );
      if (response.status == 200) {
        alert("Объявление успешно создано!");
        redirect("/admin/advertisings");
      } else if (response.status == 401) {
        alert("Срок действия текущей сессии истек. Попробуйте войти заново")
      }
    });

  const [createAdvertising, isCreateLoading, createErr] = useFetching(async (newAdvertising, file) => {
    const response = await AdvertisingService.createAdvertising(newAdvertising)
    if (response.status == 200) {
      const formData = new FormData()
      formData.append("advertisingId", response.data.id)
      formData.append("formFile", file)
      formData.append("isDeleteOldFile", "false")

      addFileToAdvertising(formData)
    } else if (response.status == 401) {
      alert("Срок действия текущей сессии истек. Попробуйте войти заново")
    }
  })

  
  const {control, handleSubmit, watch } = useForm({
    mode: "onSubmit",
    defaultValues: {
      isInSlider: false
    }
  })

  const watchIsInSlider = watch("isInSlider", false)

  const onCreate = (data) => {
    const newAdvertising = {
      buttonLink: data.link,
      mainSliderIsVisible: data.isInSlider
    }

    if (data.isInSlider) {
      newAdvertising.mainText = data.mainText
      newAdvertising.title = data.title
    }

    createAdvertising(newAdvertising, data.fileModel)
  }

  return (
    <section>
      <div className="container">
        <h1 className="admin-title title">Создание объявления</h1>
        <form
          action="#"
          className="admin-login__form form"
          onSubmit={handleSubmit(onCreate)}
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
            <span className="form__text">Главный текст</span>
            <Controller
              control={control}
              name="mainText"
              rules={{
                required: watchIsInSlider,
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
            <span className="form__text">Ссылка (не должна быть равна: bvi, fonts, Files, images, js)</span>
            <Controller
              control={control}
              name="link"
              rules={{
                required: true,
                pattern: /^(?!bvi$|\/bvi$|bvi\/$|\/bvi\/$|Files$|\/Files$|Files\/$|\/Files\/$|fonts$|\/fonts$|fonts\/$|\/fonts\/$|images$|\/images$|images\/$|\/images\/$|js$|\/js$|js\/$|\/js\/$).*$/
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
            <span className="form__text">Изображение</span>
            <Controller
              control={control}
              name="fileModel"
              rules={{
                required: true,
              }}
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
          <label className="form__label form__label_checkbox">
            <span className="form__text">В слайдере на главной странице? </span>
            <Controller
              control={control}
              name="isInSlider"
              render={({ field: { onChange }, fieldState: { error } }) => (
                <input
                  type="checkbox"
                  className={`form__input ${error ? " error" : ""}`}
                  onChange={(newValue) => onChange(newValue.target.checked)}
                />
              )}
            />
          </label>
          <button
            className={`form__btn btn`}
            disabled={isCreateLoading || isAddFileLoading}
          >
            {isCreateLoading || isAddFileLoading ? "Создание..." : "Создать"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default CreateAdvertising;
