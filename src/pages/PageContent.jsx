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

  useEffect(() => {
    const pathName = window.location.pathname;
    const pathNameArr = pathName.split("/");
    const id = parseInt(pathNameArr[pathNameArr.length - 1]);

    if (isNaN(id)) {
      redirect('/')
    } else {
      getContentById(id);
    } 
  }, []);

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
              }}
            ></div>
          </div>
        </section>
      )}
    </>
  );
};

export default PageContent;
