import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useFetching } from "../hooks/useFetching";
import { Controller, useForm } from "react-hook-form";
import AuthService from "../api/AuthService";
import { AdminContext } from "../context";

const Login = () => {
  const { setIsAuth, setEmployeeName, setIsAdminViewPublicPage, setEmployeeRole } = useContext(AdminContext);

  const redirect = useNavigate();

  const [authUser, isAuthLoading, authErr] = useFetching(
    async (login, password) => {
      const response = await AuthService.login(login, password);
      if (response.status == 200) {
        localStorage.setItem("isAuth", "true");
        setIsAuth(true);

        localStorage.setItem("access_token", response.data.access_token);

        localStorage.setItem("isAdminViewPublicPage", "false")
        setIsAdminViewPublicPage(false)

        localStorage.setItem(
          "employeeName",
          response.data.employeeDto.employeeName
        );
        setEmployeeName(`${response.data.employeeDto.employeeName}`);

        localStorage.setItem("employeeRole", response.data.employeeDto.role.name)
        setEmployeeRole(`${response.data.employeeDto.role.name}`);

        redirect("/admin");
      } else if (response.status == 400) {
        alert(response.data)
      }
    }
  );

  const { control, handleSubmit } = useForm({
    mode: "onSubmit",
  });

  const login = (data) => {
    authUser(data.login, data.password);
  };
  
  document.title = "Авторизация - МФ МАДИ"

  return (
    <section className="admin-login">
      <div className="container">
        <div className="admin-login__content">
          <h1 className="admin-title title">Авторизация</h1>
          <form
            action="#"
            className="form"
            onSubmit={handleSubmit(login)}
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
            <button
              className={`form__btn btn${isAuthLoading ? " disable" : ""}`}
              disabled={isAuthLoading}
            >
              {isAuthLoading ? "Вход..." : "Войти"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
