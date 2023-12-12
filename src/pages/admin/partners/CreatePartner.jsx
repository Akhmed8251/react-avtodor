import { Controller, useForm } from "react-hook-form";
import PartnersService from "../../../api/PartnersService";
import { useFetching } from "../../../hooks/useFetching";
import { useNavigate } from "react-router-dom";

const CreatePartner = () => {
  const redirect = useNavigate()

  const [createPartner, isCreateLoading, createErr] = useFetching(async (formData) => {
    const response = await PartnersService.createPartner(formData)
    if (response.status == 200) {
        alert("Партнер успешно создан!")
        redirect('/admin/partners')
    } else {
      console.log(createErr)
    }
  })

  
  const {control, handleSubmit} = useForm({
    mode: "onSubmit"
  })


  const onCreate = (data) => {
    const formData = new FormData()
    formData.append("name", data.name)
    formData.append("link", data.link)
    formData.append("formFile", data.fileModel[0])

    createPartner(formData)
  }

  return (
    <section>
      <div className="container">
        <h1 className="admin-title title">Создание новости</h1>
        <form
          action="#"
          className="admin-login__form form"
          onSubmit={handleSubmit(onCreate)}
          encType="multipart/form-data"
        >
          <label className="form__label">
            <span className="form__text">Название</span>
            <Controller
              control={control}
              name="name"
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
            <span className="form__text">Ссылка</span>
            <Controller
              control={control}
              name="link"
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
                  onChange={(newValue) => onChange(newValue.target.files)}
                />
              )}
            />
          </label>
          <button
            className={`form__btn btn`}
            disabled={isCreateLoading}
          >
            {isCreateLoading  ? "Создание..." : "Создать"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default CreatePartner;
