import { useState, useEffect } from 'react'
import { useFetching } from '../hooks/useFetching'
import ContactsService from '../api/ContactsService'

const Contacts = () => {
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
    getContacts()
  }, [])
 
  return (
    <section class="contacts">
        <div class="contacts__container container">
            <h2 class="contacts__title title">КОНТАКТЫ</h2>
            <ul class="contacts__list">
                {
                    contacts.map(contact => (                 
                        <li class="contacts__item contacts-item">
                            <h3 class="contacts-item__title">Наш адрес:</h3>
                            {
                                contact.contactType == 0
                                  ?
                                    <address class="contacts-item__address">367026, г. Махачкала, просп. Али-Гаджи Акушинского, 13</address>
                                  :
                                contact.contactType == 1
                                  ?
                                    <div class="contacts-item__tel">(8352) 63-47-63</div>
                                  :
                                contact.contactType == 2
                                  ?
                                    <span class="contacts-item__worktime">
                                        пн - пт 8:30 - 17:00 сб, вс - выходные дни
                                    </span>
                                  :
                                contact.contactType == 3
                                  &&
                                    <ul class="contacts-item__elements">
                                       {
                                        contact.value.split(";").map(contactReceptionItem => {
                                            const receptionArr = contactReceptionItem.split(" - ")
                                            const receptionItemName = receptionArr[1]
                                            const receptionItemValue = receptionArr[0]

                                            return (
                                                <li class="contacts-item__element">
                                                    <a href={`mailto:${receptionItemValue}`} class="contacts-item__element-link">
                                                        {receptionItemValue}
                                                    </a>
                                                    <span class="contacts-item__element-text"> - {receptionItemName}</span>
                                                </li>
                                            )
                                        })
                                       }
                                    </ul>
                            }
                        </li>                   
                    ))
                }
            </ul>
        </div>
    </section>
  )
}

export default Contacts