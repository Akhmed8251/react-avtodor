import { useEffect, useState } from "react";
import { useFetching } from "../../../hooks/useFetching";
import NewsService from "../../../api/NewsService";
import { Link } from "react-router-dom";
import Loader from "../../../components/ui/Loader";

const NewsAdmin = () => {
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
    getListNews();
  }, []);

  return (
    <section>
      <Link to={'/admin/news/create'}>Создать новость</Link>
      <table>
        <thead>
          <tr>
            <th>Дата</th>
            <th>Заголовок</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {isNewsLoading ? (
            <Loader />
          ) : (
            newsList.map((news, idx) => (
              <tr key={idx}>
                <td>{news.createDate}</td>
                <td>{news.content?.title}</td>
                <td className="actions">
                  <Link to={"/admin/news/edit"} className="edit" state={news}>
                    Изменить
                  </Link>
                  <button className="delete">Удалить</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </section>
  );
};

export default NewsAdmin;
