import { Controller, useForm } from "react-hook-form";
import NewsService from "../../../api/NewsService";
import { useFetching } from "../../../hooks/useFetching";
import { useNavigate } from "react-router-dom";
import CKEditorUI from "../../../components/ui/CKEditorUI";

const CreateNews = () => {
  const redirect = useNavigate()

  const [createNews, isCreateLoading, createErr] = useFetching(async (news) => {
    const response = await NewsService.createNews(news)
    if (response.status == 200) {
      redirect('/admin/news')
    } else {
      console.log(createErr)
    }
  })

  
  const {control, handleSubmit} = useForm({
    mode: "onSubmit"
  })


  const onCreate = (data) => {
    // const newNews = {
    //   isDeleted: false,
    //   content: {
    //     title: data.title,
    //     htmlContent: data.htmlContent,
    //     fileModels: null,
    //     isDeleted: false,
    //     contentType: 0,
    //     parentId: 0
    //   }
    //}
    console.log(data)
  }

  return (
    <section>
      <div className="container">
        <h1 className="admin-title title">Создание новости</h1>
        <form
          action="#"
          className="admin-login__form form"
          onSubmit={handleSubmit(onCreate)}
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
            <span className="form__text">Изображения</span>
            <Controller
              control={control}
              name="fileModels"
              rules={{
                required: true,
              }}
              render={({ field: { onChange }, fieldState: { error } }) => (
                <input
                  type="file"
                  multiple={true}
                  className={`form__input ${error ? " error" : ""}`}
                  onChange={(newValue) => onChange(newValue.target.files)}
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
                    onChange={(newValue) => {onChange(newValue.editor.getData())}}
                  />
                </div>
              )}
            />
          </label>
          <button
            className={`form__btn btn${isCreateLoading ? " disable" : ""}`}
            disabled={isCreateLoading}
          >
            {isCreateLoading ? "Создание..." : "Создать"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default CreateNews;
