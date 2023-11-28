import { useState, useEffect } from 'react'
import AdvertisingService from '../api/Advertising'
import { FILES_URL } from '../api/config'
import { useFetching } from '../hooks/useFetching'

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
                            <div>Загрузка...</div>
                            :
                            advertisings?.map(advertisingItem => (
                                <div className="advertising__block advertising-block">
                                    <img src={`${FILES_URL}/${advertisingItem.avatarFileName}`} alt={advertisingItem.title} />
                                </div>
                            ))
                    }
                </div>
            </div>
        </section>
    )
}

export default Advertising