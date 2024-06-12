import { Controller, useFieldArray, useForm } from "react-hook-form";
import { useFetching } from "../../../hooks/useFetching";
import { useLocation, useNavigate } from "react-router-dom";
import ContentService from "../../../api/ContentService";
import CKEditorUI from "../../../components/ui/CKEditorUI";
import Popup from "../../../components/ui/Popup";
import { useEffect, useRef, useState } from "react";
import { parsingCKEditorData } from "../../../utils/parsingDataFromCKEditor";
import faq from "../../../assets/images/faq.svg";
import tabsIcon from "../../../assets/images/tabs.svg";
import { v4 } from "uuid";
import FileModelService from "../../../api/FileModelService";
import { FILES_URL } from "../../../api/config";
import Loader from "../../../components/ui/Loader";
import deleteIcon from "../../../assets/images/menu-close.svg";
import fileIcon from "../../../assets/images/file-icon.svg";
import Select from "../../../components/ui/Select";
import AdvertisingService from "../../../api/AdvertisingService";
import MenuService from "../../../api/MenuService";

const typesContent = [
  {
    value: "Объявление",
    label: "Объявление"
  },
  {
    value: "Меню",
    label: "Меню"
  },
  {
    value: "Дочерняя страница",
    label: "Дочерняя страница"
  }
]

const EditPage = () => {
  const redirect = useNavigate();

  const location = useLocation();
  const editedPage = location.state;

  const deleteFileOnServerCheckboxRef = useRef(null);

  const advertisingSelectRef = useRef(null)
  const menuSelectRef = useRef(null)
  const contentSelectRef = useRef(null)

  const resetSelectValue = (selectRef, setOptionsState = null) => {
    selectRef.current?.setValue(null, "onChange")
    setOptionsState && setOptionsState([])
  }

  const setSelectDefaultValue = (selectRef, name, value, dataArr) => {
    selectRef.current.setValue(dataArr.find(d => d.value == value), "onChange")
    setValue(name, value)
}

  const [advertisings, setAdvertisings] = useState([]);
  const [advertisingId, setAdvertisingId] = useState(null)
  const [getAdvertisings, isAdvertisingsLoading, advertisingsErr] = useFetching(async () => {
    const response = await AdvertisingService.getAdvertisings();
    if (response.status == 200) {
      let dataArr = []
        response.data.forEach(dataItem => {
            dataArr.push({
                value: dataItem.id,
                label: dataItem.title || `Id = ${dataItem.id}`
            })
        })
      setAdvertisings(dataArr);

      setSelectDefaultValue(advertisingSelectRef, "advertisingId", editedPage.advertisingId, dataArr)
    } else if (response.status == 401) {
      alert("Срок действия текущей сессии истек. Попробуйте войти заново")
    }
  });

  const [menuList, setMenuList] = useState([]);
  const [menuId, setMenuId] = useState(null);
  const [getMenuList, isMenuListLoading, menuErr] = useFetching(async () => {
    const response = await MenuService.getMenuHierarchical();
    if (response.status == 200) {
      let dataArr = []
        response.data.forEach(dataItem => {
          if (dataItem.childMenus?.length > 0) {
            dataItem.childMenus.forEach(dataItemChild => {
              if (dataItemChild.childMenus?.length > 0) {
                dataItemChild.childMenus.forEach(dataItemChildChild => {
                  dataArr.push({
                    value: dataItemChildChild.id,
                    label: dataItemChildChild.name
                  })
                })
              } else {
                dataArr.push({
                  value: dataItemChild.id,
                  label: dataItemChild.name
                })
              }
            })
          } else {
            dataArr.push({
              value: dataItem.id,
              label: dataItem.name
            })
          }  
        })
      setMenuList(dataArr);

      setSelectDefaultValue(menuSelectRef, "menuId", editedPage.menuId, dataArr)
    } else if (response.status == 401) {
      alert("Срок действия текущей сессии истек. Попробуйте войти заново")
    }
  });

  const [contents, setContents] = useState([]);
  const [contentId, setContentId] = useState(null)
  const [getContents, isContentsLoading, contentsErr] = useFetching(async () => {
    const response = await ContentService.getContents();
    if (response.status == 200) {
      let dataArr = []
      response.data.forEach(dataItem => {
        dataArr.push({
          value: dataItem.id,
          label: dataItem.title
        })
      })
      setContents(dataArr);

      setSelectDefaultValue(contentSelectRef, "contentId", editedPage.contentId, dataArr)
    } else if (response.status == 401) {
      alert("Срок действия текущей сессии истек. Попробуйте войти заново")
    }
  });

  const [fileModels, setFileModels] = useState(null);
  const [getContentById, isGetPageLoading, pageErr] = useFetching(
    async (contentId) => {
      const response = await ContentService.getContentById(contentId);
      if (response.status == 200) {
        setFileModels(
          response.data.fileModels.filter((f) => f.isDeleted == false)
        );
      } else if (response.status == 401) {
        alert("Срок действия текущей сессии истек. Попробуйте войти заново")
      }
    }
  );

  const [modalConfirmDeleteActive, setModalConfirmDeleteActive] =
    useState(false);
  const [modalAccordeon, setModalAccordeon] = useState(false);
  const [modalTabs, setModalTabs] = useState(false);
  const [editPage, isEditLoading, editErr] = useFetching(
    async (content, files = null) => {
      const response = await ContentService.editContent(content);
      if (response.status == 200) {
        if (files != null) {
          const formData = new FormData();
          formData.append("contentId", editedPage.id);
          Array.from(files).forEach((file) => {
            formData.append("formFiles", file);
          });
          createFileModel(formData);
        } else {
          alert("Страница успешно изменена!");
          redirect("/admin/pages");
        }
      } else if (response.status == 401) {
        alert("Срок действия текущей сессии истек. Попробуйте войти заново")
      }
      
    }
  );

  const [createFileModel, isCreateFileModelLoading, createFileModelErr] =
    useFetching(async (creatingFileModel) => {
      const response = await FileModelService.createFileModel(
        creatingFileModel
      );
      if (response.status == 200) {
        alert("Страница успешно изменена и добавлены файлы к ней!");
        redirect("/admin/pages");
      } else if (response.status == 401) {
        alert("Срок действия текущей сессии истек. Попробуйте войти заново")
      }
    });

  const [deleteFileOnServer, isDeleteFileLoading, deleteFileErr] = useFetching(
    async (fileModelId) => {
      const response = await FileModelService.deleteFileOnServer(fileModelId);
      if (response.status == 200) {
        alert("Удаление файла прошло успешно!");
        closeModalConfirmDelete();
        getContentById(editedPage.id)
      } else if (response.status == 401) {
        alert("Срок действия текущей сессии истек. Попробуйте войти заново")
      }
    }
  );

  const [deletingImageId, setDeletingImageId] = useState(null);
  const [deleteFileModel, isDeleteLoading, deleteErr] = useFetching(
    async (fileModelId) => {
      const response = await FileModelService.deleteFileModel(fileModelId);
      if (response.status == 200) {
        alert("Удаление файла прошло успешно!");
        closeModalConfirmDelete();
        getContentById(editedPage.id)
      } else if (response.status == 401) {
        alert("Срок действия текущей сессии истек. Попробуйте войти заново")
      }
    }
  );

  const { control, handleSubmit, watch, setValue, getValues } = useForm({
    mode: "onSubmit",
    defaultValues: {
      title: editedPage.title,
      htmlContent: editedPage.htmlContent,
      ownLink: editedPage.ownLink,
      typeContent: editedPage.advertisingId ? "Объявление" : editedPage.menuId ? "Меню" : "Дочерняя страница"
    },
  });

  const { control: controlTabs, handleSubmit: handleSubmitTabs } = useForm({
    mode: "onSubmit",
    defaultValues: {
      tabs: [{ title: "", tabHtmlContent: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: "tabs",
    control: controlTabs,
  });

  const { control: controlAccordion, handleSubmit: handleSubmitAccordion } =
    useForm({
      mode: "onSubmit",
      defaultValues: {
        accordions: [{ title: "", accordionHtmlContent: "" }],
      },
    });

  const {
    fields: fieldsAccordion,
    append: appendAccordion,
    remove: removeAccordion,
  } = useFieldArray({
    name: "accordions",
    control: controlAccordion,
  });

  const closeModalConfirmDelete = () => {
    setDeletingImageId(null);
    setModalConfirmDeleteActive(false);
  };

  const addAccordionToCkeditor = (data) => {
    let accordeonHTML = "<ul>";

    data.accordions.forEach((accEl) => {
      const accItemHtml = `
        <li>
          <div class="accordeon__control">
            <p class="accordeon__title">${accEl.title}</p>
            <div class="accordeon__icon"></div>
          </div>
          <div class="accordeon__content">
            ${accEl.accordionHtmlContent}
          </div>
        </li>
      `;
      accordeonHTML += accItemHtml;
    });

    accordeonHTML += "</ul>";

    const ckeditorData = window.CKEDITOR.instances["editor1"].getData();
    window.CKEDITOR.instances["editor1"].setData(ckeditorData + accordeonHTML);

    setModalAccordeon(false);
  };

  const addTabsToCkeditor = (data) => {
    let tabsHtml = '<div class="tabs-wrapper"><div class="tabs">';

    let tabHtml = "";
    let tabContentHtml = "";
    data.tabs.forEach((tab, idx) => {
      const uid = v4();
      tabHtml += `
        <a href="#tab-${uid}" class="tab ${idx == 0 ? " _active" : ""}">${
        tab.title
      }</a>
      `;
      tabContentHtml += `
        <div id="tab-${uid}" class="tabs-content ${idx == 0 ? " _active" : ""}">
          ${tab.tabHtmlContent}
        </div>
      `;
    });
    tabsHtml += tabHtml;
    tabsHtml += "</div></div>";

    tabsHtml += '<div class="tabs-container">';
    tabsHtml += tabContentHtml;
    tabsHtml += "</div>";

    const ckeditorData = window.CKEDITOR.instances["editor1"].getData();
    window.CKEDITOR.instances["editor1"].setData(ckeditorData + tabsHtml);

    setModalTabs(false);
  };

  const watchTypeContent = watch("typeContent", getValues("typeContent"))

  const onEdit = (data) => {
    const pageContent = {
      id: editedPage.id,
      title: data.title,
      ownLink: data.ownLink,
      htmlContent: parsingCKEditorData(data.htmlContent),
      contentType: 0,
      createDate: editedPage.createDate,
      fileModels: editedPage.fileModels,
      isDeleted: false
    };

    if (advertisingId) {
      pageContent.advertisingId = data.advertisingId
    } else if (menuId) {
      pageContent.menuId = data.menuId
    } else if (contentId) {
      pageContent.contentId = data.contentId
    }

    editPage(pageContent, data.fileModels);
  };

  useEffect(() => {
    if (watchTypeContent) {
      resetSelectValue(advertisingSelectRef, setAdvertisings)
      setAdvertisingId(null)

      resetSelectValue(menuSelectRef, setMenuList)
      setMenuId(null)

      resetSelectValue(contentSelectRef, setContents)
      setContentId(null)
    }

    if (watchTypeContent == "Объявление") {
      getAdvertisings()
    } else if (watchTypeContent == "Меню") {
      getMenuList()
    } else if (watchTypeContent == "Дочерняя страница") {
      getContents()
    }
  }, [watchTypeContent])

  return (
    <>
      <section>
        <div className="container">
          <h1 className="admin-title title">Изменение страницы</h1>
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
              <span className="form__text">Ссылка (не должна быть равна названию одной из зарезервированных папок: bvi, fonts, Files, images, js, ckeditor)</span>
              <Controller
                control={control}
                name="ownLink"
                rules={{
                  required: true,
                  pattern: /^(?!bvi$|\/bvi$|bvi\/$|\/bvi\/$|Files$|\/Files$|Files\/$|\/Files\/$|fonts$|\/fonts$|fonts\/$|\/fonts\/$|images$|\/images$|images\/$|\/images\/$|js$|\/js$|js\/$|\/js\/$|ckeditor$|\/ckeditor$|ckeditor\/$|\/ckeditor\/$).*$/i
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
              <span className="form__text">Файлы к странице</span>
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
            </label>
            <label className="form__label">
              {fileModels != null && (
                <div className="form__files">
                  <ul className="form__files-list">
                    {isGetPageLoading ? (
                      <Loader />
                    ) : (
                      fileModels?.map((file, idx) => (
                        <li
                          key={idx}
                          data-id={file.id}
                          className="form__files-item files-item"
                        >
                          <a
                            href={`${FILES_URL}/${file.name}`}
                            target={"_blank"}
                          >
                            <img src={fileIcon} width={128} alt="" />
                          </a>
                          <span className="files-item__name">{file.name}</span>
                          <button
                            type="button"
                            className="files-item__remove"
                            onClick={() => {
                              setDeletingImageId(file.id);
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
              <span className="form__text">Тип контента</span>
              <Controller
                control={control}
                name="typeContent"
                rules={{
                  required: true
                }}
                render={({ field: { value, onChange }, fieldState: { error } }) => (
                  <div className={`${error ? "error" : ""}`}>
                    <Select
                      value={typesContent.find(t => t.value == value)}
                      placeholder="Введите тип контента"
                      options={typesContent}
                      isDisabled={false}
                      onChange={(newValue) => onChange(newValue.value)}
                    />
                </div>
                )}
              />
            </label>
            {
              watchTypeContent == "Объявление"
              ?
              <label className="form__label">
                <span className="form__text">Объявление</span>
                <Controller
                  control={control}
                  name="advertisingId"
                  rules={{
                    required: watchTypeContent == "Объявление"
                  }}
                  render={({ field: { value, onChange }, fieldState: { error } }) => (
                    <div className={`${error ? "error" : ""}`}>
                      <Select
                        value={advertisings.find(a => a.value == value)}
                        ref={advertisingSelectRef}
                        placeholder="Введите название объявления или его id"
                        options={advertisings}
                        isLoading={isAdvertisingsLoading}
                        isDisabled={isAdvertisingsLoading}
                        onChange={(newValue) => { setAdvertisingId(newValue?.value); onChange(newValue?.value) }}
                      />
                  </div>
                  )}
                />
              </label>
              :
                  watchTypeContent == "Дочерняя страница"
                  ?
                  <label className="form__label">
                    <span className="form__text">Дочерняя страница</span>
                    <Controller
                      control={control}
                      name="contentId"
                      rules={{
                        required: watchTypeContent == "Дочерняя страница"
                      }}
                      render={({ field: { value, onChange }, fieldState: { error } }) => (
                        <div className={`${error ? "error" : ""}`}>
                          <Select
                            value={contents.find(c => c.value == value)}
                            ref={contentSelectRef}
                            placeholder="Введите заголовок страницы"
                            onChange={(newValue) => { setContentId(newValue?.value); onChange(newValue?.value) }}
                            options={contents}
                            isLoading={isContentsLoading}
                            isDisabled={isContentsLoading}
                          />
                      </div>
                      )}
                    />
                </label>
                :
                  watchTypeContent == "Меню"
                  &&
                <label className="form__label">
                  <span className="form__text">Меню</span>
                  <Controller
                    control={control}
                    name="menuId"
                    rules={{
                      required: watchTypeContent == "Меню"
                    }}
                    render={({ field: { value, onChange }, fieldState: { error } }) => (
                      <div className={`${error ? "error" : ""}`}>
                        <Select
                          value={menuList.find(m => m.value == value)}
                          ref={menuSelectRef}
                          placeholder="Введите меню"
                          onChange={(newValue) => { setMenuId(newValue?.value); onChange(newValue?.value) }}
                          options={menuList}
                          isLoading={isMenuListLoading}
                          isDisabled={isMenuListLoading}
                        />
                      </div>
                    )}
                  />
                </label>
            }
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
                  <div>
                    <button
                      title="Добавить FAQ"
                      type="button"
                      onClick={() => setModalAccordeon(true)}
                    >
                      <img
                        width={32}
                        style={{ padding: "4px" }}
                        height={32}
                        src={faq}
                        alt=""
                      />
                    </button>
                    <button
                      title="Добавить вкладки"
                      type="button"
                      onClick={() => setModalTabs(true)}
                    >
                      <img
                        width={32}
                        style={{ padding: "4px" }}
                        height={32}
                        src={tabsIcon}
                        alt=""
                      />
                    </button>
                    <div className={`${error ? "error" : ""}`}>
                      <CKEditorUI
                        allowUploadImage
                        initData={value}
                        onChange={(newValue) => {
                          onChange(newValue.editor.getData());
                        }}
                      />
                    </div>
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
          Вы действительно хотите удалить файл?
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
            {(isDeleteLoading || isDeleteFileLoading) ? <Loader isOnlySpinner /> : <span>Да</span>}
          </button>
          <button
            className="confirm-button confirm-button_no"
            onClick={closeModalConfirmDelete}
          >
            Нет
          </button>
        </div>
      </Popup>
      <Popup active={modalAccordeon} setActive={setModalAccordeon}>
        <h2 className="popup__title title">Создание FAQ элемента</h2>
        <div className="accordion">
          <form
            className="form"
            onSubmit={handleSubmitAccordion(addAccordionToCkeditor)}
          >
            {fieldsAccordion.map((field, idx) => (
              <>
                <div className="form__item" key={idx} data-key={idx}>
                  <label className="form__label">
                    <span className="form__text">Заголовок</span>
                    <Controller
                      control={controlAccordion}
                      name={`accordions.${idx}.title`}
                      rules={{
                        required: true,
                      }}
                      render={({
                        field: { onChange },
                        fieldState: { error },
                      }) => (
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
                      control={controlAccordion}
                      name={`accordions.${idx}.accordionHtmlContent`}
                      rules={{
                        required: true,
                      }}
                      render={({
                        field: { onChange },
                        fieldState: { error },
                      }) => (
                        <div className={`${error ? "error" : ""}`}>
                          <CKEditorUI
                            name={`accordions.${idx}`}
                            onChange={(newValue) => {
                              onChange(newValue.editor.getData());
                            }}
                          />
                        </div>
                      )}
                    />
                  </label>
                  <div style={{ display: "flex", gap: "20px" }}>
                    {idx > 0 && (
                      <button
                        data-key={idx}
                        className="btn delete"
                        type="button"
                        onClick={() => removeAccordion(idx)}
                      >
                        Удалить
                      </button>
                    )}
                  </div>
                </div>
              </>
            ))}
            <button
              className="btn"
              type="button"
              onClick={() =>
                appendAccordion({ title: "", accordionHtmlContent: "" })
              }
            >
              Добавить
            </button>
            <button className="btn" style={{ marginTop: 30 }}>
              Создать
            </button>
          </form>
        </div>
      </Popup>
      <Popup active={modalTabs} setActive={setModalTabs}>
        <h2 className="popup__title title">Создание вкладок</h2>
        <div className="accordion">
          <form className="form" onSubmit={handleSubmitTabs(addTabsToCkeditor)}>
            {fields.map((field, idx) => (
              <>
                <div className="form__item" key={idx}>
                  <label className="form__label">
                    <span className="form__text">Заголовок</span>
                    <Controller
                      control={controlTabs}
                      name={`tabs.${idx}.title`}
                      rules={{
                        required: true,
                      }}
                      render={({
                        field: { onChange },
                        fieldState: { error },
                      }) => (
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
                      control={controlTabs}
                      name={`tabs.${idx}.tabHtmlContent`}
                      rules={{
                        required: true,
                      }}
                      render={({
                        field: { onChange },
                        fieldState: { error },
                      }) => (
                        <div className={`${error ? "error" : ""}`}>
                          <CKEditorUI
                            name={`tabs.${idx}`}
                            onChange={(newValue) => {
                              onChange(newValue.editor.getData());
                            }}
                          />
                        </div>
                      )}
                    />
                  </label>
                  <div style={{ display: "flex", gap: "20px" }}>
                    {idx > 0 && (
                      <button
                        className="btn delete"
                        type="button"
                        onClick={() => remove(idx)}
                      >
                        Удалить
                      </button>
                    )}
                  </div>
                </div>
              </>
            ))}
            <button
              className="btn"
              type="button"
              onClick={() => append({ title: "", tabHtmlContent: "" })}
            >
              Добавить
            </button>
            <button className="btn" style={{ marginTop: 30 }}>
              Создать
            </button>
          </form>
        </div>
      </Popup>
    </>
  );
};

export default EditPage;
