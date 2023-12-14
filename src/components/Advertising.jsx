import { useState, useEffect } from 'react'
import AdvertisingService from '../api/AdvertisingService'
import { FILES_URL } from '../api/config'
import { useFetching } from '../hooks/useFetching'
import { Link } from 'react-router-dom'
import Loader from './ui/Loader'

const Advertising = () => {
    const [advertisings, setAdvertisings] = useState([])
    const [getAdvertisings, isAdvertisingLoading, advertisingErr] = useFetching(async () => {
        const response = await AdvertisingService.getLastAdvertisings()
        if (response.status === 200) {
            setAdvertisings(response.data)
        } else {
            console.log(advertisingErr)
        }
    })

    useEffect(() => {
        getAdvertisings()
    }, [])

    return (
        <section className="advertising">
            <div className="advertising__container container">
                <div className="advertising__content">
                    {
                        isAdvertisingLoading
                            ?
                            <Loader />
                            :
                            advertisings.filter(a => a.mainSliderIsVisible == false).map(advertisingItem => (
                                <Link to={advertisingItem.buttonLink} className="advertising__block advertising-block">
                                    <img src={`${FILES_URL}/${advertisingItem.avatarFileName}`} alt='' />
                                </Link>
                            ))
                    }
                </div>
            </div>
        </section>
    )
}

export default Advertising