import { useEffect, useState } from 'react'
import Hero from '../components/Hero'
import PartnersService from '../api/PartnersService'
import Advertising from '../components/Advertising'
import Partners from '../components/Partners'
import {useFetching}  from '../hooks/useFetching'
import MainNews from '../components/MainNews'
import NewsService from '../api/NewsService'
import Map from '../components/Map'

const Main = () => {
  const [partners, setPartners] = useState([])
  const [getPartners, isPartnersLoading, partnersErr] = useFetching(async () => {
    const response = await PartnersService.getAllPartners()
    if (response.status === 200) {
      setPartners(response.data)
    } else {
      console.log(partnersErr)
    }
  })

  const [mainNews, setMainNews] = useState([])
  const [getMainNews, isMainNewsLoading, mainNewsErr] = useFetching(async () => {
    const response = await NewsService.getAllNews()
    if (response.status === 200) {
      setMainNews(response.data)
    } else {
      console.log(mainNewsErr)
    }
  })

  useEffect(() => {
    getMainNews()
    getPartners()
  }, [])

  return (
    <>
      <Hero />
      <Advertising />
      {isMainNewsLoading ? <div>Загрузка...</div> : <MainNews mainNewsItems={mainNews} />}
      {isPartnersLoading ? <div>Загрузка...</div> : <Partners partnerItems={partners} />}
      <Map />
    </>
  )
}

export default Main