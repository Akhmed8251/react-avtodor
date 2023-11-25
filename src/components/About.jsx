import React from 'react'

const About = () => {
  return (
    <section class="about">
        <div class="about__container container">
            <div class="about__wrapper">
                <div class="about__content">
                    <h2 class="about__title title">Махачкалинский филиал МАДИ</h2>
                    <p class="about__desc">
                        МАДИ — крупнейший автомобильно-дорожный вуз России, ведущий научно-образовательный и
                        методический центр
                        по подготовке бакалавров и специалистов в области строительства автомобильных дорог,
                        мостов и аэродромов,
                        эксплуатации и сервиса транспортной техники, экономики, управления и логистики на
                        транспорте
                        и в строительстве, автоматизированных систем управления и организации дорожного
                        движения.
                    </p>
                    <a href="/" class="about__btn btn btn_darker">Сведения об ОО</a>
                </div>
                <div class="about__image"></div>
            </div>
        </div>
    </section>
  )
}

export default About