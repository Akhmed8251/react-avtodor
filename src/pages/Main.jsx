import Hero from '../components/Hero'
import Advertising from '../components/Advertising'
import Partners from '../components/Partners'
import MainNews from '../components/MainNews'
import Map from '../components/Map'
import About from '../components/About'
import Contacts from '../components/Contacts'
import { useContext } from 'react'
import { AdminContext } from '../context'

const Main = () => {
  const { specialEnable } = useContext(AdminContext)
  document.title = "Главная - МФ МАДИ"
  return (
    <>
      <Hero />
      <Advertising />
      <MainNews />
      <About />
      <Partners />
      <Contacts />
      <Map />
    </>
  )
}

export default Main