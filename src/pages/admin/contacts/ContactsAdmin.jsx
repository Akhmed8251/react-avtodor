import { useContext, useEffect, useState } from "react";
import { useFetching } from "../../../hooks/useFetching";
import { Link } from "react-router-dom";
import Loader from "../../../components/ui/Loader";
import { formatTime } from "../../../utils/time";
import { AdminContext } from "../../../context";
import Popup from "../../../components/ui/Popup"
import ContactsService from "../../../api/ContactsService";

const ContactsAdmin = () => {
  const { setCurrentPageName } = useContext(AdminContext);

  const [modalConfirmDeleteActive, setModalConfirmDeleteActive] = useState(false)

  const [contactId, setContactId] = useState(null)
  const [contacts, setContacts] = useState([]);
  const [getContacts, isContactsLoading, contactsErr] = useFetching(async () => {
    const response = await ContactsService.getContacts();
    if (response.status == 200) {
      setContacts(response.data);
    } else {
      console.log(contactsErr);
    }
  });

  const [deleteContact, isDeleteLoading, deleteErr] = useFetching(async (contactId) => {
    const response = await ContactsService.deleteContact(contactId)
    if (response.status == 200) {
      alert("Контакт успешно удален!");
      closeModalConfirmDelete()
      deleteContactFromTable(contactId)
    } else {
      console.log(deleteErr);
    }
  });

  const closeModalConfirmDelete = () => {
    setContactId(null); 
    setModalConfirmDeleteActive(false)
  }

  const deleteContactFromTable = (id) => {
    document.querySelector(`[data-id='${id}'`).remove()
  }

  useEffect(() => {
    setCurrentPageName("Контакты");
    getContacts();
  }, []);

  const contactTypes = {
    0: "Наш адрес",
    1: "Телефон",
    2: "График работы",
    3: "Приемная МФ МАДИ"
  }


  return (
    <>
      <section>
        <h1 className="admin-title title">Контакты</h1>
        <Link to={"/admin/contact/create"} className="create btn">
          Создать
        </Link>
        {isContactsLoading ? (
          <Loader />
        ) : (
          <table>
            <thead>
              <tr>
                <th>Дата создания</th>
                <th>Тип контакта</th>
                <th>Название</th>
                <th>Значение</th>
                <th>Действия</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((contact, idx) => (
                <tr data-id={contact.id} key={idx}>
                  <td>{formatTime(contact.createDate)}</td>
                  <td>{contactTypes[contact.contactType]}</td>
                  <td>{contact.name}</td>
                  <td>{contact.value}</td>
                  <td className="actions">
                    <Link
                      to={`/admin/contact/edit`}
                      className="edit btn"
                      state={contact}
                    >
                      Изменить
                    </Link>
                    <button className="delete btn" onClick={() => { setContactId(contact.id); setModalConfirmDeleteActive(true) }}>
                      Удалить
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
      <Popup active={modalConfirmDeleteActive} setActive={closeModalConfirmDelete}>
      <h2 className="popup__title title">Вы действительно хотите удалить контакт?</h2>
        <div className="confirm-buttons">
          <button onClick={() => deleteContact(contactId)} className='confirm-button confirm-button_yes' disabled={isDeleteLoading} >
            {
              isDeleteLoading ? <Loader isOnlySpinner/>
                :
                <span>Да</span>
            }
          </button>
          <button className="confirm-button confirm-button_no" onClick={closeModalConfirmDelete}>Нет</button>
        </div>
      </Popup>
    </>
  );
};

export default ContactsAdmin;
