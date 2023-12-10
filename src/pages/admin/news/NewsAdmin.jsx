import { useContext, useEffect, useState } from "react";
import { useFetching } from "../../../hooks/useFetching";
import NewsService from "../../../api/NewsService";
import { Link } from "react-router-dom";
import Loader from "../../../components/ui/Loader";
import { formatTime } from "../../../utils/time";
import { AdminContext } from "../../../context";

const NewsAdmin = () => {
  const { setCurrentPageName } = useContext(AdminContext);

  const [newsList, setNewsList] = useState([]);

  const [getListNews, isNewsLoading, newsErr] = useFetching(async () => {
    const response = await NewsService.getNews();
    if (response.status == 200) {
      setNewsList(response.data);
    } else {
      console.log(newsErr);
    }
  });

  useEffect(() => {
    setCurrentPageName("Новости");
    getListNews();
  }, []);

  const onDelete = () => {
    const isDeleteNews = confirm("Вы уверены, что хотите удалить новость?")
    if (isDeleteNews) {
      alert("sdsad")
    }
  }

  return (
    <section>
      <Link to={"/admin/news/create"} className="create btn">Создать</Link>
      {isNewsLoading ? (
        <Loader />
      ) : (
        <table>
          <thead>
            <tr>
              <th>Дата</th>
              <th>Заголовок</th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            {
              newsList.map((news, idx) => (
                <tr key={idx}>
                  <td>{formatTime(news.createDate)}</td>
                  <td>{news.content?.title}</td>
                  <td className="actions">
                    <Link to={"/admin/news/edit"} className="edit btn" state={news}>
                      Изменить
                    </Link>
                    <button className="delete btn" onClick={onDelete}>Удалить</button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      )}
    </section>
  );
};

export default NewsAdmin;
