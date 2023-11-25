import React from 'react'
import { Link } from 'react-router-dom'
import { FILES_URL } from '../api/config'
import { Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react';

const Partners = ({ partnerItems }) => {
  return (
    <section className="partners">
        <h2 className="partners__title title">ПАРТНЕРЫ</h2>
        <div className="partners__wrapper">
            <div className="partners__container container">
                <Swiper
                    modules={[Pagination]} 
                    pagination
                    navigation={{ prevEl: ".partners__wrapper .swiper-button-prev", nextEl: ".partners__wrapper .swiper-button-next", }}
                    className="partners__slider"
                    spaceBetween={25}
                    breakpoints={{
                        426: {
                            slidesPerView: 2
                        },
                        769: {
                            slidesPerView: 3
                        },
                        1025: {
                            slidesPerView: 4
                        }
                    }}
                >
                    {
                        partnerItems.map(partner => (
                            <SwiperSlide>
                                <Link to={partner.link} className="partners-slide">
                                    <img src={`${FILES_URL}${partner.imageFileName}`} alt={partner.name} />
                                </Link>
                            </SwiperSlide>
                        ))
                    }
                </Swiper>
                <div className="swiper-pagination"></div>
            </div>
        </div>
    </section>
  )
}

export default Partners