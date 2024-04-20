import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FILES_URL } from "../api/config";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules"
import { formatTime } from "../utils/time";
import { useFetching } from "../hooks/useFetching";
import NewsService from "../api/NewsService";
import Loader from './ui/Loader'

const NEWS_VISIBLE_COUNT = 3
const SKIP_NEWS = 0

const MainNews = () => {
  const [mainNews, setMainNews] = useState([])
  const [getMainNews, isMainNewsLoading, mainNewsErr] = useFetching(async () => {
    const response = await NewsService.getNews(SKIP_NEWS, NEWS_VISIBLE_COUNT)
    if (response.status === 200) {
      setMainNews(response.data)
    } else {
      console.log(mainNewsErr)
    }
  })

  useEffect(() => {
    getMainNews()
  }, [])

  return (
    <section className="news">
      <div className="news__container container">
        <h2 className="news__title title">НОВОСТИ</h2>
        {
          isMainNewsLoading
            ?
              <Loader />
            :
            <Swiper
              modules={[Pagination]}
              autoHeight
              pagination
              spaceBetween={30}
              breakpoints={{
                  320: {
                      slidesPerView: 1,
                  },
                  526: {
                      slidesPerView: 2
                  },
                  993: {
                      slidesPerView: 3
                  }
              }}
              className="news__slider"
            >
              {mainNews.map((news, idx) => (
                <SwiperSlide key={idx}>
                  <div className="news-item">
                    <Link to={`/news/${news.id}`} className="news-item__link">
                      <div className="news-item__image">
                        <img src={`${FILES_URL}/${news.content?.fileModels[0]?.name}`} alt="" className="bvi-img" />
                      </div>
                      <h3 className="news-item__title">{news.content?.title}</h3>
                      <time className="news-item__date">{formatTime(news.createDate)}</time>
                    </Link>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
        }
        <div className="news__more">
          <Link to="/news" className="news__btn btn">
            Все новости
          </Link>
        </div>
      </div>
    </section>
  );
};

export default MainNews;
