import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FILES_URL } from "../api/config";
import { Swiper, SwiperSlide } from "swiper/react";
import { formatTime } from "../utils/time";
import { useFetching } from "../hooks/useFetching";
import NewsService from "../api/NewsService";
import Loader from './ui/Loader'

const MainNews = () => {
  const [mainNews, setMainNews] = useState([])
  const [getMainNews, isMainNewsLoading, mainNewsErr] = useFetching(async () => {
    const response = await NewsService.getNews()
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
              autoHeight
              spaceBetween={30}
              pagination
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
                        <img src={`${FILES_URL}/${news.content?.fileModels[0]?.name}`} alt="" />
                      </div>
                      <h3 className="news-item__title">{news.mainText}</h3>
                      <time className="news-item__date">{formatTime(news.createDate)}</time>
                    </Link>
                  </div>
                </SwiperSlide>
              ))}
              <div className="swiper-pagination"></div>
            </Swiper>
        }
        <div>
          
        </div>
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
