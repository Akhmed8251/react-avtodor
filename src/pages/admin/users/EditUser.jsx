import { Controller, useForm } from "react-hook-form";
import { useFetching } from "../../../hooks/useFetching";
import { useLocation, useNavigate } from "react-router-dom";
import EmployeeService from "../../../api/EmployeeService";

const EditUser = () => {
  const data = useLocation()
  const editedUser = data.state

  const redirect = useNavigate()

  const [editUser, isEditLoading, editErr] = useFetching(async (newUser) => {
    const response = await EmployeeService.editUser(newUser)
    if (response.status == 200) {
      alert("Пользователь успешно изменен!")
      redirect("/admin/users")
    } else if (response.status == 401) {
      alert("Срок действия текущей сессии истек. Попробуйте войти заново")
    }
  })

  
  const {control, handleSubmit } = useForm({
    mode: "onSubmit",
    defaultValues: {
      login: editedUser.name,
      password: editedUser.password,
      roleId: editedUser.roleId
    }
  })

  const onCreate = (data) => {
    const newUser = {
      id: editedUser.id,
      login: data.login,
      password: data.password,
      roleId: data.roleId
    }

    editUser(newUser)
  }

  return (
    <section>
      <div className="container">
        <h1 className="admin-title title">Изменение пользователя</h1>
        <form
          action="#"
          className="form"
          onSubmit={handleSubmit(onCreate)}
          encType="multipart/form-data"
        >
          <label className="form__label">
            <span className="form__text">Имя пользователя</span>
            <Controller
              control={control}
              name="login"
              rules={{
                required: true,
              }}
              render={({ field: { value, onChange }, fieldState: { error } }) => (
                <input
                  type="text"
                  value={value}
                  className={`form__input ${error ? " error" : ""}`}
                  onChange={(newValue) => onChange(newValue)}
                />
              )}
            />
          </label>
          <label className="form__label">
            <span className="form__text">Пароль</span>
            <Controller
              control={control}
              name="password"
              rules={{
                required: true,
              }}
              render={({ field: { value, onChange }, fieldState: { error } }) => (
                <input
                  type="password"
                  value={value}
                  className={`form__input ${error ? " error" : ""}`}
                  onChange={(newValue) => onChange(newValue)}
                />
              )}
            />
          </label>
          <label className="form__label form__label_checkbox">
            <span className="form__text">Администратор</span>
            <Controller
              control={control}
              name="roleId"
              render={({ field: { value, onChange }, fieldState: { error } }) => (
                <input
                  type="radio"
                  value={1}
                  name="role"
                  checked={value == 1}
                  className={`form__input ${error ? " error" : ""}`}
                  onChange={(newValue) => onChange(parseInt(newValue.target.value))}
                />
              )}
            />
          </label>
          <label className="form__label form__label_checkbox">
            <span className="form__text">Сотрудник</span>
            <Controller
              control={control}
              name="roleId"
              render={({ field: { value, onChange }, fieldState: { error } }) => (
                <input
                  type="radio"
                  value={2}
                  name="role"
                  checked={value == 2}
                  className={`form__input ${error ? " error" : ""}`}
                  onChange={(newValue) => onChange(parseInt(newValue.target.value))}
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

export default EditUser;
