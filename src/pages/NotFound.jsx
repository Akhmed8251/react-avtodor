import { Link } from "react-router-dom";
import notFoundGif from "../assets/images/404.gif";

const NotFound = () => {
  return (
    <section className="not-found">
      <div className="container">
        <div className="not-found__content">
          <h1 className="not-found__title title">Ошибка 404</h1>
          <div className="not-found__desc">
            <p>Страница не найдена</p>
            <p>Рекомендуем проверить правильность написания URL</p>
          </div>
          <img className="bvi-img" src={notFoundGif} alt="" />
          <div className="not-found__btns">
            <Link to={"/"} className="btn">
              Вернуться на главную
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
