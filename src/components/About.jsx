import React from 'react'

const About = () => {
  return (
    <section className="about">
        <div className="about__container container">
            <div className="about__wrapper">
                <div className="about__content">
                    <h2 className="about__title title">Махачкалинский филиал МАДИ</h2>
                    <p className="about__desc">
                        МАДИ — крупнейший автомобильно-дорожный вуз России, ведущий научно-образовательный и
                        методический центр
                        по подготовке бакалавров и специалистов в области строительства автомобильных дорог,
                        мостов и аэродромов,
                        эксплуатации и сервиса транспортной техники, экономики, управления и логистики на
                        транспорте
                        и в строительстве, автоматизированных систем управления и организации дорожного
                        движения.
                    </p>
                    <a href="/" className="about__btn btn btn_darker">Сведения об ОО</a>
                </div>
                <div className="about__image"></div>
            </div>
        </div>
    </section>
  )
}

export default About