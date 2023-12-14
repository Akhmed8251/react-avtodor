import { Controller, useForm } from "react-hook-form";
import { useFetching } from "../../../hooks/useFetching";
import { useLocation, useNavigate } from "react-router-dom";
import AdvertisingService from "../../../api/AdvertisingService";

const EditAdvertising = () => {
  const redirect = useNavigate()
  const location = useLocation()
  const editedAdvertising = location.state

  const [addFileToAdvertising, isAddFileLoading, addFileErr] =
    useFetching(async (formData) => {
      const response = await AdvertisingService.addFileToAdvertising(
        formData
      );
      if (response.status == 200) {
        alert("Объявление успешно обновлено!");
        redirect("/admin/advertisings");
      }
    });

  const [editAdvertising, isEditLoading, editErr] = useFetching(async (advertising, file = null) => {
    const response = await AdvertisingService.editAdvertising(advertising)
    if (response.status == 200) {
      if (file) {
        const formData = new FormData()
        formData.append("advertisingId", advertising.id)
        formData.append("formFile", file)
        console.log(file)
        addFileToAdvertising(formData)
      } else {
        alert("Объявление успешно обновлено!");
        redirect("/admin/advertisings");
      }
    } else {
      console.log(editErr)
    }
  })

  
  const {control, handleSubmit, watch } = useForm({
    mode: "onSubmit",
    defaultValues: {
        title: editedAdvertising.title || "",
        mainText: editedAdvertising.mainText || "",
        link: editedAdvertising.buttonLink,
        isInSlider: editedAdvertising.mainSliderIsVisible
    }
  })

  const watchIsInSlider = watch("isInSlider", editedAdvertising.mainSliderIsVisible)

  const onEdit = (data) => {
    const newAdvertising = {
      id: editedAdvertising.id,
      createDate: editedAdvertising.createDate,
      buttonLink: data.link,
      mainSliderIsVisible: data.isInSlider,
      avatarFileName: editedAdvertising.avatarFileName
    }

    if (data.isInSlider) {
      newAdvertising.mainText = data.mainText
      newAdvertising.title = data.title
    }

    editAdvertising(newAdvertising, data.fileModel)
  }

  return (
    <section>
      <div className="container">
        <h1 className="admin-title title">Изменение объявления</h1>
        <form
          action="#"
          className="admin-login__form form"
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
            <span className="form__text">Ссылка</span>
            <Controller
              control={control}
              name="link"
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
            disabled={isEditLoading || isAddFileLoading}
          >
            {isEditLoading || isAddFileLoading  ? "Изменение..." : "Изменить"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default EditAdvertising;
