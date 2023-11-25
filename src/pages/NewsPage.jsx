import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useFetching } from "../hooks/useFetching";
import NewsService from "../api/NewsService";
import { useParams } from "react-router-dom";
import Gallery from "../components/Gallery";

const NewsPage = () => {
  const urlParams = useParams();
  const newsId = urlParams.id;

  const [newsInfo, setNewsInfo] = useState(null);
  const [getNewsById, isNewsLoading, newsErr] = useFetching(async (newsId) => {
    const response = await NewsService.getNewsById(newsId);
    if (response.status === 200) {
      setNewsInfo(response.data);
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
          <div>Загрузка...</div>
        ) : (
          <>
            <h1 className="news-page__title title">{newsInfo?.content.title}</h1>
            <Gallery images={newsInfo?.content.fileModels} />
            <div className="news-page__content" dangerouslySetInnerHTML={{ __html: newsInfo?.content.htmlContent }}></div>
          </>
        )}
        <div className="news-page__bottom">
          <Link to="/" className="btn">
              На главную
          </Link>
          <Link to="/news" className="btn">
              Все новости
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NewsPage;