import React from 'react'
import gosuslugi from '../assets/images/gosuslugi.jpg'
import abitur from '../assets/images/abitur.jpg'

const Advertising = () => {
  return (
    <section className="advertising">
        <div className="advertising__container container">
            <div className="advertising__content">
                <div className="advertising__block advertising-block">
                    <img src={gosuslugi} alt="Госуслуги" />
                </div>
                <div className="advertising__block advertising-block">
                    <img src={abitur} alt="" />
                </div>
            </div>
        </div>
    </section>
  )
}

export default Advertising