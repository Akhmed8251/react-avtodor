import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useFetching } from "../hooks/useFetching";
import { Controller, useForm } from "react-hook-form";
import AuthService from "../api/AuthService";
import { AdminContext } from "../context";

const Login = () => {
  const { setIsAuth } = useContext(AdminContext)

  const redirect = useNavigate();

  const [authUser, isAuthLoading, authErr] = useFetching(
    async (login, password) => {
      const response = await AuthService.login(login, password);
      if (response.status == 200) {
        localStorage.setItem("isAuth", "true")
        setIsAuth(true)

        redirect("/admin");
      } else {
        console.log(authErr);
      }
    }
  );

  const { control, handleSubmit } = useForm({
    mode: "onSubmit",
  });

  const login = (data) => {
    authUser(data.login, data.password);
  };

  return (
    <section className="admin-login">
      <div className="admin-login__content">
        <h1 className="title">Авторизация</h1>
        <form
          action="#"
          className="admin-login__form form"
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
    </section>
  );
};

export default Login;
