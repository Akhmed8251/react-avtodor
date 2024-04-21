import { Controller, useForm } from "react-hook-form";
import { useFetching } from "../../../hooks/useFetching";
import { useLocation, useNavigate } from "react-router-dom";
import ContactsService from "../../../api/ContactsService";
import Select from "../../../components/ui/Select";

const EditContact = () => {
  const location = useLocation()
  const editedContact = location.state
  const redirect = useNavigate()

  const [editContact, isEditLoading, editErr] = useFetching(async (contact) => {
    const response = await ContactsService.editContact(contact)
    if (response.status == 200) {
        alert("Контакт успешно обновлен!")
        redirect("/admin/contacts")
    } else if (response.status == 401) {
      alert("Срок действия текущей сессии истек. Попробуйте войти заново")
    }
  })

  
  const {control, handleSubmit, watch } = useForm({
    mode: "onSubmit",
    defaultValues: {
        contactType: editedContact.contactType,
        name: editedContact.name,
        value: editedContact.value,
        isTopMainPageVisible: editedContact.isTopMainPageVisible,
    }
  })

  const watchContactType = watch("contactType", editedContact.contactType)

  const onEdit = (data) => {
    const editableContact = {
        id: editedContact.id,
        name: data.contactType == 3 ? data.name : contactTypes.find(c => c.value == data.contactType).label,
        value: data.value,
        contactType: data.contactType,
        isTopMainPageVisible: data.isTopMainPageVisible,
        isDeleted: false,
        createDate: editedContact.createDate,
        updateDate: editedContact.updateDate
    }
    
    editContact(editableContact)
  }

  const contactTypes = [
    {
      label: "Наш адрес",
      value: 0
    },
    {
      label: "Телефон",
      value: 1
    },
    {
      label: "График работы",
      value: 2
    },
    {
      label: "Приемная МФ МАДИ",
      value: 3
    }
  ]

  return (
    <section>
      <div className="container">
        <h1 className="admin-title title">Изменение контакта</h1>
        <form
          action="#"
          className="form"
          onSubmit={handleSubmit(onEdit)}
        >
          <label className="form__label">
            <span className="form__text">Тип контакта</span>
            <Controller
              control={control}
              name="contactType"
              rules={{
                required: true,
              }}
              render={({ field: { value, onChange }, fieldState: { error } }) => (
                <div className={`${error ? "error" : ""}`}>
                  <Select
                    value={contactTypes.find(c => c.value == value)}
                    isDisabled={false}
                    options={contactTypes}
                    onChange={(newValue) => onChange(newValue.value)}
                  />
                </div>
              )}
            />
          </label>
          <label className="form__label" style={{ display: watchContactType != 3 ? "none" : "block"}}>
            <span className="form__text">Название</span>
            <Controller
              control={control}
              name="name"
              rules={{
                required: watchContactType == 3,
              }}
              render={({ field: { value, onChange }, fieldState: { error } }) => (
                <input
                  value={value}
                  type="text"
                  className={`form__input ${error ? " error" : ""}`}
                  onChange={(newValue) => onChange(newValue)}
                />
              )}
            />
          </label>
          <label className="form__label">
            <span className="form__text">Значение (если тип "Приемная МФ МАДИ" - то пишется почта)</span>
            <Controller
              control={control}
              name="value"
              rules={{
                required: true,
              }}
              render={({ field: { value, onChange }, fieldState: { error } }) => (
                <input
                  value={value}
                  type="text"
                  className={`form__input ${error ? " error" : ""}`}
                  onChange={(newValue) => onChange(newValue)}
                />
              )}
            />
          </label>
          <label className="form__label form__label_checkbox">
            <span className="form__text">Отобразить в верху страницы? </span>
            <Controller
              control={control}
              name="isTopMainPageVisible"
              render={({ field: { value, onChange }, fieldState: { error } }) => (
                <input
                  checked={value}
                  type="checkbox"
                  className={`form__input ${error ? " error" : ""}`}
                  onChange={(newValue) => onChange(newValue.target.checked)}
                />
              )}
            />
          </label>
          <button
            className={`form__btn btn`}
            disabled={isEditLoading}
          >
            {isEditLoading ? "Изменение..." : "Изменить"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default EditContact;
