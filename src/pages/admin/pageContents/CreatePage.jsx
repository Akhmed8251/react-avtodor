import { Controller, useForm } from "react-hook-form";
import { useFetching } from "../../../hooks/useFetching";
import { useNavigate } from "react-router-dom";
import ContentService from "../../../api/ContentService";
import CKEditorUI from "../../../components/ui/CKEditorUI";
import Popup from "../../../components/ui/Popup";
import { useState } from "react";
import { parsingCKEditorData } from "../../../utils/accordion";
import faq from "../../../assets/images/faq.svg"

const CreatePage = () => {
  const redirect = useNavigate();

  const [modalAccordeon, setModalAccordeon] = useState(false);

  const [createPage, isCreateLoading, createErr] = useFetching(
    async (content) => {
      const response = await ContentService.createContent(content);
      if (response.status == 200) {
        alert("Страница успешно создана!");
        redirect("/admin/pages");
      } else {
        console.log(createErr);
      }
    }
  );

  const { control, handleSubmit } = useForm({
    mode: "onSubmit",
  });

  const { control: controlAccordion, handleSubmit: handleSubmitAccordion } = useForm({
    mode: "onSubmit",
  });


  const addAccordionToCkeditor = (data) => {
    let accordeonHTML = "<ul>"

    const accItemHtml = `
        <li>
          <div class="accordeon__control">
            <p>${data.title}</p>
            <div class="accordeon__icon"></div>
          </div>
          <div class="accordeon__content">
            ${data.accordionHtmlContent}
          </div>
        </li>
      `
    accordeonHTML += accItemHtml

    const ckeditorInstance = document.querySelector(".admin-login__form .cke");
    const ckeditorIframeBody =
      ckeditorInstance.querySelector("iframe").contentWindow.document.body;
    const ckeditorHtmlSource = ckeditorIframeBody.innerHTML;

    ckeditorIframeBody.innerHTML = ckeditorHtmlSource + accordeonHTML;

    setModalAccordeon(false)
  };

  const onCreate = (data) => {
    const pageContent = {
      title: data.title,
      htmlContent: parsingCKEditorData(data.htmlContent),
      contentType: 0,
      isDeleted: false,
      parentContentId: null,
      parentContent: null,
      newsId: null,
      advertisingId: null,
    };

    createPage(pageContent);
  };

  return (
    <>
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
                  <div>
                    <button
                      title="Добавить FAQ элемент"
                      type="button"
                      onClick={() => setModalAccordeon(true)}
                    >
                      <img width={32} style={{ padding: '4px' }} height={32} src={faq} alt="" />
                    </button>
                    <div className={`${error ? "error" : ""}`}>
                      <CKEditorUI
                        onChange={(newValue) => {
                          onChange(newValue.editor.getData());
                        }}
                      />
                    </div>
                  </div>
                )}
              />
            </label>
            <button className={`form__btn btn`} disabled={isCreateLoading}>
              {isCreateLoading ? "Создание..." : "Создать"}
            </button>
          </form>
        </div>
      </section>
      <Popup active={modalAccordeon} setActive={setModalAccordeon}>
        <h2 className="popup__title title">
          Создание FAQ элемента
        </h2>
        <div className="accordion">
          <form className="form" onSubmit={handleSubmitAccordion(addAccordionToCkeditor)}>
          <label className="form__label">
              <span className="form__text">Заголовок</span>
              <Controller
                control={controlAccordion}
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
                control={controlAccordion}
                name="accordionHtmlContent"
                rules={{
                  required: true,
                }}
                render={({ field: { onChange }, fieldState: { error } }) => (
                  <div className={`${error ? "error" : ""}`}>
                      <CKEditorUI
                        onChange={(newValue) => {
                          onChange(newValue.editor.getData());
                        }}
                      />
                    </div>
                )}
              />
            </label>
            <button className="btn">
              Создать
            </button>
          </form>
          
        </div>
      </Popup>
    </>
  );
};

export default CreatePage;
