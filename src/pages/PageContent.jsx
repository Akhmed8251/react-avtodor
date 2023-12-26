import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import NewsService from "../api/NewsService";
import { useFetching } from "../hooks/useFetching";
import Loader from "../components/ui/Loader";
import ContentService from "../api/ContentService";

const PageContent = () => {
  const redirect = useNavigate();

  const [contentInfo, setContentInfo] = useState(null);
  const [getContentById, isContentLoading, contentErr] = useFetching(
    async (newsId) => {
      const response = await ContentService.getContents();
      if (response.status === 200) {
        const content = response.data.find((c) => c.id == newsId);
        if (content == null) {
          redirect('/')
        }

        setContentInfo(content);
        document.title = `${content.title} - МФ МАДИ`;
      } else if (response.status == 204) {
        if (response.data.length == 0) {
          redirect('/');
        }
      } else {
        console.log(contentErr);
      }
    }
  );

  const accordion = (controlElem) => {
    if (controlElem.classList.contains("accordeon__control")) {
      const itemAccordeon = controlElem.closest("li");
      itemAccordeon.classList.toggle("_active");

      let accordeonContent = itemAccordeon.querySelector(".accordeon__content");
      if (itemAccordeon.classList.contains("_active")) {
        accordeonContent.style.maxHeight = accordeonContent.scrollHeight + "px";
      } else {
        accordeonContent.style.maxHeight = null;
      }
    }
  }

  useEffect(() => {
    const pathName = window.location.pathname;
    const pathNameArr = pathName.split("/");
    const id = parseInt(pathNameArr[pathNameArr.length - 1]);

    if (isNaN(id)) {
      redirect('/')
    } else {
      getContentById(id);
    } 
  }, [window.location.pathname]);

  return (
    <>
      {isContentLoading ? (
        <Loader />
      ) : (
        <section className="content-page">
          <div className="content-page__container container">
            <h1 className="content-page__title title">{contentInfo?.title}</h1>
            <div
              className="content-page__content"
              dangerouslySetInnerHTML={{
                __html: contentInfo?.htmlContent,
              }} onClick={(evt) => accordion(evt.target)}
            ></div>
          </div>
        </section>
      )}
    </>
  );
};

export default PageContent;
