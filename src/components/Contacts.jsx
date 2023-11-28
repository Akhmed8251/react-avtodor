import { useState, useEffect } from "react";
import { useFetching } from "../hooks/useFetching";
import ContactsService from "../api/ContactsService";

const Contacts = () => {
  const [contacts, setContacts] = useState([]);
  const [getContacts, isContactsLoading, contactsErr] = useFetching(
    async () => {
      const response = await ContactsService.getContacts();
      if (response.status === 200) {
        setContacts(response.data.sort((a, b) => a.contactType - b.contactType));
      } else {
        console.log(contactsErr);
      }
    }
  );

  useEffect(() => {
    getContacts();
  }, []);

  return (
    <section className="contacts">
      <div className="contacts__container container">
        <h2 className="contacts__title title">КОНТАКТЫ</h2>
        <ul className="contacts__list">
          {
            isContactsLoading ? <div>Загрузка...</div>
                :
                contacts
                .filter((c) => c.contactType != 3)
                .map((contact, idx) => (
                  <li className="contacts__item contacts-item" key={idx}>
                    <h3 className="contacts-item__title">{contact.name}</h3>
                    <span
                      className={`contacts-item__value ${
                        contact.contactType == 0
                          ? "contacts-item__value_address"
                          : contact.contactType == 2
                          ? "contacts-item__value_worktime"
                          : ""
                      }`}
                    >
                      {contact.value}
                    </span>
                  </li>
                ))
          }
          {
            isContactsLoading ? <div>Загрузка...</div>
              :
              <li className="contacts__item contacts-item">
                <h3 className="contacts-item__title">Приемная МФ МАДИ:</h3>
                <ul className="contacts-item__elements">
                  {contacts
                    .filter((c) => c.contactType == 3)
                    .map((contactReceptionItem, idx) => (
                      <li key={idx} className="contacts-item__element">
                        <a
                          href={`mailto:${contactReceptionItem.value}`}
                          className="contacts-item__element-link"
                        >
                          {contactReceptionItem.value}
                        </a>
                        <span className="contacts-item__element-text">
                          - {contactReceptionItem.name}
                        </span>
                      </li>
                    ))}
                </ul>
              </li>
          }
        </ul>
      </div>
    </section>
  );
};

export default Contacts;
