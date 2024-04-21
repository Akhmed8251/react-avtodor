import { Controller, useForm } from "react-hook-form";
import NewsService from "../../../api/NewsService";
import { useFetching } from "../../../hooks/useFetching";
import { useLocation, useNavigate } from "react-router-dom";
import CKEditorUI from "../../../components/ui/CKEditorUI";
import FileModelService from "../../../api/FileModelService";
import { FILES_URL } from "../../../api/config";
import { useEffect, useRef, useState } from "react";
import Popup from "../../../components/ui/Popup";
import Loader from "../../../components/ui/Loader";
import deleteIcon from "../../../assets/images/menu-close.svg";

const EditNews = () => {
  const redirect = useNavigate();
  const location = useLocation();
  const editedNewsState = location.state;

  const deleteFileOnServerCheckboxRef = useRef(null);
  
  const [editedNews, setEditedNews] = useState(editedNewsState)
  const [modalConfirmDeleteActive, setModalConfirmDeleteActive] =
    useState(false);
  const [fileModels, setFileModels] = useState(null);
  const [getNewsById, isGetNewsLoading, getNewsErr] = useFetching(
    async (newsId) => {
      const response = await NewsService.getNewsById(newsId);
      if (response.status == 200) {
        setEditedNews(response.data)
        setFileModels(
          response.data.content?.fileModels.filter((f) => f.isDeleted == false)
        );
      } else if (response.status == 401) {
        alert("Срок действия текущей сессии истек. Попробуйте войти заново")
      }
    }
  );

  const [deletingImageId, setDeletingImageId] = useState(null);
  const [createFileModel, isCreateFileModelLoading, createFileModelErr] =
    useFetching(async (creatingFileModel) => {
      const response = await FileModelService.createFileModel(
        creatingFileModel
      );
      if (response.status == 200) {
        alert("Новость успешно обновлена и добавлены файлы!");
        redirect("/admin/news");
      } else if (response.status == 401) {
        alert("Срок действия текущей сессии истек. Попробуйте войти заново")
      }
    });

  const [deleteFileOnServer, isDeleteFileLoading, deleteFileErr] = useFetching(
    async (fileModelId) => {
      const response = await FileModelService.deleteFileOnServer(fileModelId);
      if (response.status == 200) {
        alert("Удаление фотографий прошло успешно!");
        closeModalConfirmDelete();
        getNewsById(editedNews.id);
      } else if (response.status == 401) {
        alert("Срок действия текущей сессии истек. Попробуйте войти заново")
      }
    }
  );

  const [editNews, isEditLoading, editErr] = useFetching(
    async (news, files = null) => {
      const response = await NewsService.updateNews(news);
      if (response.status == 200) {
        const formData = new FormData();
        if (files) {
          formData.append("contentId", news.content.id);
          Array.from(files).forEach((file) => {
            formData.append("formFiles", file);
          });

          createFileModel(formData);
        } else {
          alert("Новость успешно обновлена!");
          redirect("/admin/news");
        }
      } else if (response.status == 401) {
        alert("Срок действия текущей сессии истек. Попробуйте войти заново")
      }
    }
  );

  const [deleteFileModel, isDeleteLoading, deleteErr] = useFetching(
    async (fileModelId) => {
      const response = await FileModelService.deleteFileModel(fileModelId);
      if (response.status == 200) {
        alert("Удаление фотографий прошло успешно!");
        closeModalConfirmDelete();
        getNewsById(editedNews.id);
      } else if (response.status == 401) {
        alert("Срок действия текущей сессии истек. Попробуйте войти заново")
      }
    }
  );

  const closeModalConfirmDelete = () => {
    setDeletingImageId(null);
    setModalConfirmDeleteActive(false);
  };

  const onEdit = (data) => {
    const news = {
      id: editedNews.id,
      mainText: editedNews.mainText,
      isDeleted: editedNews.isDeleted,
      createDate: editedNews.createDate,
      updateDate: editedNews.updateDate,
      content: {
        id: editedNews.content?.id,
        mainText: editedNews.content?.mainText,
        title: data.title,
        htmlContent: data.htmlContent,
        fileModels: editedNews.content?.fileModels,
        contentType: editedNews.content?.contentType,
        isDeleted: editedNews.content?.isDeleted,
        createDate: editedNews.content?.createDate,
        updateDate: editedNews.content?.updateDate,
        parentId: editedNews.content?.parentId,
        newsId: editedNews.content?.newsId,
      },
    };
    editNews(news, data.fileModels);
  };

  useEffect(() => {
    getNewsById(editedNews.id);
  }, []);

  const { control, handleSubmit } = useForm({
    mode: "onSubmit",
    defaultValues: {
      title: editedNews.content?.title,
      htmlContent: editedNews.content?.htmlContent,
    },
  });

  return (
    <>
      <section>
        <div className="container">
          <h1 className="admin-title title">Изменение новости</h1>
          <form
            action="#"
            className="form"
            onSubmit={handleSubmit(onEdit)}
          >
            <label className="form__label">
              <span className="form__text">Заголовок</span>
              <Controller
                control={control}
                name="title"
                rules={{
                  required: true,
                }}
                render={({
                  field: { value, onChange },
                  fieldState: { error },
                }) => (
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
              <span className="form__text">Изображения</span>
              <Controller
                control={control}
                name="fileModels"
                render={({ field: { onChange }, fieldState: { error } }) => (
                  <input
                    type="file"
                    multiple={true}
                    className={`form__input ${error ? " error" : ""}`}
                    onChange={(newValue) => onChange(newValue.target.files)}
                  />
                )}
              />
              {(fileModels != null && fileModels?.length > 0 ) && (
                <div className="form__images">
                  <ul className="form__images-list">
                    {isGetNewsLoading ? (
                      <Loader />
                    ) : (
                      fileModels?.map((imageFile, idx) => (
                        <li
                          key={idx}
                          data-id={imageFile.id}
                          className="form__images-item images-item"
                        >
                          <a
                            href={`${FILES_URL}/${imageFile.name}`}
                            target={"_blank"}
                          >
                            <img
                              src={`${FILES_URL}/${imageFile.name}`}
                              alt=""
                            />
                          </a>
                          <button
                            type="button"
                            className="images-item__remove"
                            onClick={() => {
                              setDeletingImageId(imageFile.id);
                              setModalConfirmDeleteActive(true);
                            }}
                          >
                            <img src={deleteIcon} alt="" />
                          </button>
                        </li>
                      ))
                    )}
                  </ul>
                </div>
              )}
            </label>
            <label className="form__label">
              <span className="form__text">Контент</span>
              <Controller
                control={control}
                name="htmlContent"
                rules={{
                  required: true,
                }}
                render={({
                  field: { value, onChange },
                  fieldState: { error },
                }) => (
                  <div className={`${error ? "error" : ""}`}>
                    <CKEditorUI
                      initData={value}
                      onChange={(newValue) => {
                        onChange(newValue.editor.getData());
                      }}
                    />
                  </div>
                )}
              />
            </label>
            <button
              className={`form__btn btn`}
              disabled={isEditLoading || isCreateFileModelLoading}
            >
              {isEditLoading || isCreateFileModelLoading
                ? "Изменение..."
                : "Изменить"}
            </button>
          </form>
        </div>
      </section>
      <Popup
        active={modalConfirmDeleteActive}
        setActive={closeModalConfirmDelete}
      >
        <h2 className="popup__title title">
          Вы действительно хотите удалить фотографию из новости?
        </h2>
        <label className="popup__checkbox-label">
          <span>Удалить файл на сервере</span>
          <input type="checkbox" ref={deleteFileOnServerCheckboxRef} />
        </label>
        <div className="confirm-buttons">
          <button
            onClick={() => {
              if (deleteFileOnServerCheckboxRef.current.checked) {
                deleteFileOnServer(deletingImageId)
              } else {
                deleteFileModel(deletingImageId)
              }
            }}
            className="confirm-button confirm-button_yes"
            disabled={isDeleteLoading || isDeleteFileLoading}
          >
            {isDeleteLoading || isDeleteFileLoading ? (
              <Loader isOnlySpinner />
            ) : (
              <span>Да</span>
            )}
          </button>
          <button
            className="confirm-button confirm-button_no"
            onClick={closeModalConfirmDelete}
          >
            Нет
          </button>
        </div>
      </Popup>
    </>
  );
};

export default EditNews;
