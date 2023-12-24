import { Controller, useForm } from "react-hook-form";
import { useFetching } from "../../../hooks/useFetching";
import { useNavigate } from "react-router-dom";
import ContentService from "../../../api/ContentService";
import CKEditorUI from "../../../components/ui/CKEditorUI";

const CreatePage = () => {
  const redirect = useNavigate()

  const [createPage, isCreateLoading, createErr] = useFetching(async (content) => {
    const response = await ContentService.createContent(content)
    if (response.status == 200) {
      alert("Страница успешно создана!")
      redirect("/admin/pages")
    } else {
      console.log(createErr)
    }
  })

  
  const {control, handleSubmit} = useForm({
    mode: "onSubmit"
  })


  const onCreate = (data) => {
    const pageContent = {
      title: data.title,
      htmlContent: data.htmlContent,
      contentType: 0,
      isDeleted: false,
      parentContentId: null,
      parentContent: null,
      newsId: null,
      advertisingId: null
    }

    createPage(pageContent)
  }


  return (
    <section>
      <div className="container">
        <h1 className="admin-title title">Создание страницы</h1>
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
            <span className="form__text">Контент</span>
            <Controller
              control={control}
              name="htmlContent"
              rules={{
                required: true,
              }}
              render={({ field: { onChange }, fieldState: { error } }) => (
                <div className={`${error ? "error" : ""}`}>
                  <CKEditorUI
                    allowUploadImage
                    onChange={(newValue) => {onChange(newValue.editor.getData())}}
                  />
                </div>
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

export default CreatePage;
