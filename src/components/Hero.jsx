import React from "react";
import heroImg from '../assets/images/slider.jpg'
import { Pagination, Navigation, EffectCreative } from 'swiper/modules'
import { Swiper,  SwiperSlide,  } from 'swiper/react';


const Hero = () => {
  return (
    <section className="hero">
      <div className="hero__container container">
        <div className="hero__slider-container">
          <Swiper 
            modules={[Navigation, Pagination, EffectCreative]} 
            pagination
            navigation={{ prevEl: ".hero__slider-container .swiper-button-prev", nextEl: ".hero__slider-container .swiper-button-next", }}
            className="hero__slider"
            effect={'creative'}
            creativeEffect={{ prev: {translate: ['-20%', 0, '-1px'], opacity: .4}, next: {translate: ['100%', 0, 0], opacity: .4}, shadowPerProgress: true }} 
            speed={1000} 
          >
            <SwiperSlide>
               <a 
                href="/" 
                className="hero-slide" 
                style={{ background: `url("${heroImg}") no-repeat center / cover` }}>
              </a>
            </SwiperSlide>
            <SwiperSlide>
               <a 
                href="/" 
                className="hero-slide" 
                style={{ background: `linear-gradient(359deg, rgba(0, 0, 0, 0.80) 0.87%, rgba(0, 0, 0, 0.30) 99.42%), url("https://akhmed8251.github.io/Avtodor/images/slider.jpg") no-repeat center / cover, lightgray 50% / cover no-repeat` }}>
                  <div className="hero-slide__content">
                    <h1 className="hero-slide__title title">МАДИ в топ 100 лучших вузов России</h1>
                    <p className="hero-slide__desc">Первая лига Национального агрегированного
                        рейтинка</p>
                  </div>
              </a>
            </SwiperSlide>       
            <SwiperSlide>
               <a 
                href="/" 
                className="hero-slide" 
                style={{ background: `url("${heroImg}") no-repeat center / cover` }}>
              </a>
            </SwiperSlide>
            <SwiperSlide>
              {/* <a 
                href="/" 
                className="hero-slide" 
                style={{ background: `linear-gradient(359deg, rgba(0, 0, 0, 0.80) 0.87%, rgba(0, 0, 0, 0.30) 99.42%), url("${heroImg}") no-repeat center / cover, lightgray 50% / cover no-repeat` }}>
              </a> */}
               <a 
                href="/" 
                className="hero-slide" 
                style={{ background: `url("${heroImg}") no-repeat center / cover` }}>
              </a>
            </SwiperSlide>
          </Swiper>
          <div className="swiper-button-prev"></div>
          <div className="swiper-button-next"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
