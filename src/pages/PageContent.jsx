import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useFetching } from "../hooks/useFetching";
import Loader from "../components/ui/Loader";
import ContentService from "../api/ContentService";

const PageContent = () => {
  const redirect = useNavigate();

  const [contentInfo, setContentInfo] = useState(null);
  const [getContentById, isContentLoading, contentErr] = useFetching(
    async (contentId) => {
      const response = await ContentService.getContentById(contentId);
      if (response.status === 200) {
        setContentInfo(response.data);
        document.title = `${response.data.title} - МФ МАДИ`;
      } else if (response.status == 204) {
        if (response.data.length == 0) {
          redirect('/');
        }
      } else {
        console.log(contentErr);
      }
    }
  );

  const actions = (evt) => {
    const elem = evt.target
    if (elem.classList.contains("accordeon__control")) {
      evt.preventDefault()
      accordion(elem)
    } else if (elem.classList.contains("tab")) {
      evt.preventDefault()
      tabs(elem)
    }
  }

  const accordion = (controlElem) => {
    const itemAccordeon = controlElem.closest("li");
      itemAccordeon.classList.toggle("_active");

      let accordeonContent = itemAccordeon.querySelector(".accordeon__content");
      if (itemAccordeon.classList.contains("_active")) {
        accordeonContent.style.maxHeight = accordeonContent.scrollHeight + "px";
      } else {
        accordeonContent.style.maxHeight = null;
      }
  }

  const tabs = (tabElem) => {

    for (let sibling of tabElem.parentNode.children) {
        sibling.classList.remove('_active');
    }
    for (let sibling of tabElem.closest('.tabs-wrapper').parentNode.children) {
        if (sibling.classList.contains('tabs-container')) {
            sibling.querySelectorAll('.tabs-content').forEach(content => {
                content.classList.remove('_active');
            });
        }
    }
    tabElem.classList.add('_active');
    document.querySelector(tabElem.getAttribute('href')).classList.add('_active');
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
              }} onClick={(evt) => actions(evt)}
            ></div>
          </div>
        </section>
      )}
    </>
  );
};

export default PageContent;
