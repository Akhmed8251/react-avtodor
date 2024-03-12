import React, { useEffect, useState } from "react";
import { useFetching } from "../hooks/useFetching";
import NewsService from "../api/NewsService";
import { useParams } from "react-router-dom";
import Gallery from "../components/ui/Gallery";
import Loader from "../components/ui/Loader";


const NewsPage = () => {
  const urlParams = useParams();
  const newsId = urlParams.id;
  

  const [newsInfo, setNewsInfo] = useState(null);
  const [getNewsById, isNewsLoading, newsErr] = useFetching(async (newsId) => {
    const response = await NewsService.getNewsById(newsId);
    if (response.status === 200) {
      setNewsInfo(response.data);
      document.title = `${response.data.content?.title} - МФ МАДИ`
    } else {
      console.log(newsErr);
    }
  });

  useEffect(() => {
    getNewsById(newsId);
  }, []);

  return (
    <section className="news-page">
      <div className="news-page__container container">
        {isNewsLoading ? (
          <Loader />
        ) : (
          <>
            <h1 className="news-page__title title">
              {newsInfo?.content.title}
            </h1>
            <Gallery images={newsInfo?.content.fileModels?.filter(f => f.isDeleted == false)} />
            <div
              className="news-page__content"
              dangerouslySetInnerHTML={{
                __html: newsInfo?.content.htmlContent,
              }}
            ></div>
          </>
        )}
        <div className="news-page__bottom">
          <a href="/" className="btn">
            На главную
          </a>
          <a href="/news" className="btn">
            Все новости
          </a>
        </div>
      </div>
    </section>
  );
};

export default NewsPage;
