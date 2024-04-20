import { useContext, useEffect, useState } from "react";
import { useFetching } from "../../../hooks/useFetching";
import { Link } from "react-router-dom";
import Loader from "../../../components/ui/Loader";
import { AdminContext } from "../../../context";
import AdvertisingService from "../../../api/AdvertisingService";
import { FILES_URL } from "../../../api/config";

const AdvertisingsAdmin = () => {
  const { setCurrentPageName } = useContext(AdminContext);

  const [advertising, setAdvertising] = useState([]);
  const [getMainPageDownAdvertising, isAdvertisingsLoading, advertisingsErr] =
    useFetching(async () => {
      const response = await AdvertisingService.getMainPageDownAdvertising();
      if (response.status == 200) {
        setAdvertising(response.data);
      } else if (response.status == 401) {
        alert("Срок действия текущей сессии истек. Попробуйте войти заново")
      }
    });

  useEffect(() => {
    setCurrentPageName("ОбМАДИ");
    getMainPageDownAdvertising();
  }, []);

  return (
    <>
      <section>
        <h1 className="admin-title title">Об МАДИ</h1>
        {isAdvertisingsLoading ? (
          <Loader />
        ) : (
          <table>
            <thead>
              <tr>
                <th>Заголовок</th>
                <th>Главный текст</th>
                <th>Изображение</th>
                <th>Текст кнопки</th>
                <th>Ссылка</th>
                <th>Действия</th>
              </tr>
            </thead>
            <tbody>
              <tr data-id={advertising.id}>
                <td>{advertising.title}</td>
                <td>{advertising.mainText}</td>
                <td style={{ width: "300px" }}>
                  <img
                    src={`${FILES_URL}/${advertising.avatarFileName}`}
                    alt=""
                  />
                </td>
                <td>{advertising.buttonText}</td>
                <td>
                  <a href={advertising.buttonLink}>{advertising.buttonLink}</a>
                </td>
                <td className="actions">
                  <Link
                    to={"/admin/about/edit"}
                    className="edit btn"
                    state={advertising}
                  >
                    Изменить
                  </Link>
                </td>
              </tr>
            </tbody>
          </table>
        )}
      </section>
    </>
  );
};

export default AdvertisingsAdmin;
