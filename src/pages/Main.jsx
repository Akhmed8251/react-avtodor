import { useEffect, useState } from 'react'
import Hero from '../components/Hero'
import PartnersService from '../api/PartnersService'
import Advertising from '../components/Advertising'
import Partners from '../components/Partners'
import {useFetching}  from '../hooks/useFetching'
import MainNews from '../components/MainNews'
import NewsService from '../api/NewsService'
import Map from '../components/Map'
import About from '../components/About'
import ContactsService from '../api/ContactsService'
import Contacts from '../components/Contacts'

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

  const [contacts, setContacts] = useState([])
  const [getContacts, isContactsNewsLoading, contactsErr] = useFetching(async () => {
    const response = await ContactsService.getAllContacts()
    if (response.status === 200) {
      setContacts(response.data)
    } else {
      console.log(contactsErr)
    }
  })

  useEffect(() => {
    getMainNews()
    getPartners()
    getContacts()
  }, [])

  return (
    <>
      <Hero />
      <Advertising />
      {isMainNewsLoading ? <div>Загрузка...</div> : <MainNews mainNewsItems={mainNews} />}
      <About />
      {isPartnersLoading ? <div>Загрузка...</div> : <Partners partnerItems={partners} />}
      {isContactsNewsLoading ? <div>Загрузка...</div> : <Contacts contactItems={contacts} />}
      <Map />
    </>
  )
}

export default Main