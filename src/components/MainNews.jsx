import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { FILES_URL } from "../api/config";
import { Swiper, SwiperSlide } from "swiper/react";
import { formatTime } from "../utils/time";

const MainNews = ({ mainNewsItems }) => {
  return (
    <section className="news">
      <div className="news__container container">
        <h2 className="news__title title">НОВОСТИ</h2>
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
          {mainNewsItems.map((news) => (
            <SwiperSlide>
              <div className="news-slide">
                <Link to={`/news/${news.id}`} className="news-slide__link">
                  <div className="news-slide__image">
                    <img src={`${FILES_URL}${news.mainImageFileName}`} alt="" />
                  </div>
                  <h3 className="news-slide__title">{news.mainText}</h3>
                  <time className="news-slide__date">{formatTime(news.createDate)}</time>
                </Link>
              </div>
            </SwiperSlide>
          ))}
          <div className="swiper-pagination"></div>
        </Swiper>
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
