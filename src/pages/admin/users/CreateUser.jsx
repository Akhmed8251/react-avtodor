import { Controller, useForm } from "react-hook-form";
import { useFetching } from "../../../hooks/useFetching";
import { useNavigate } from "react-router-dom";
import EmployeeService from "../../../api/EmployeeService";

const CreateUser = () => {
  const redirect = useNavigate()

  const [createUser, isCreateLoading, createErr] = useFetching(async (newUser) => {
    const response = await EmployeeService.createUser(newUser)
    if (response.status == 200) {
      alert("Пользователь успешно создан!")
      redirect("/admin/users")
    } else if (response.status == 401) {
      alert("Срок действия текущей сессии истек. Попробуйте войти заново")
    }
  })

  
  const {control, handleSubmit } = useForm({
    mode: "onSubmit",
    defaultValues: {
      roleId: 2
    }
  })

  const onCreate = (data) => {
    const newUser = {
      login: data.login,
      password: data.password,
      roleId: data.roleId
    }

    createUser(newUser)
  }

  return (
    <section>
      <div className="container">
        <h1 className="admin-title title">Создание пользователя</h1>
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
              render={({ field: { onChange }, fieldState: { error } }) => (
                <input
                  type="text"
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
              render={({ field: { onChange }, fieldState: { error } }) => (
                <input
                  type="password"
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
            disabled={isCreateLoading}
          >
            {isCreateLoading ? "Создание..." : "Создать"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default CreateUser;
