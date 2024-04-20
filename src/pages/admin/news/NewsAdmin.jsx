import { useContext, useEffect, useState } from "react";
import { useFetching } from "../../../hooks/useFetching";
import NewsService from "../../../api/NewsService";
import { Link } from "react-router-dom";
import Loader from "../../../components/ui/Loader";
import { formatTime } from "../../../utils/time";
import { AdminContext } from "../../../context";
import Popup from "../../../components/ui/Popup"

const NewsAdmin = () => {
  const { setCurrentPageName } = useContext(AdminContext);

  const [modalConfirmDeleteActive, setModalConfirmDeleteActive] = useState(false)

  const [newsId, setNewsId] = useState(null)
  const [newsList, setNewsList] = useState([]);
  const [getListNews, isNewsLoading, newsErr] = useFetching(async () => {
    const response = await NewsService.getNews();
    if (response.status == 200) {
      setNewsList(response.data);
    } else if (response.status == 401) {
      alert("Срок действия текущей сессии истек. Попробуйте войти заново")
    }
  });

  const [deleteNews, isDeleteLoading, deleteErr] = useFetching(async (newsId) => {
    const response = await NewsService.deleteNews(newsId)
    if (response.status == 200) {
      alert("Новость успешно удалена!");
      closeModalConfirmDelete()
      deleteNewsFromTable(newsId)
    } else if (response.status == 401) {
      alert("Срок действия текущей сессии истек. Попробуйте войти заново")
    }
  });

  const closeModalConfirmDelete = () => {
    setNewsId(null); 
    setModalConfirmDeleteActive(false)
  }

  const deleteNewsFromTable = (id) => {
    document.querySelector(`[data-id='${id}'`).remove()
  }

  useEffect(() => {
    setCurrentPageName("Новости");
    getListNews();
  }, []);


  return (
    <>
      <section>
        <h1 className="admin-title title">Новости</h1>
        <Link to={"/admin/news/create"} className="create btn">
          Создать
        </Link>
        {isNewsLoading ? (
          <Loader />
        ) : (
          <table>
            <thead>
              <tr>
                <th>Дата создания</th>
                <th>Заголовок</th>
                <th>Действия</th>
              </tr>
            </thead>
            <tbody>
              {newsList.map((news, idx) => (
                <tr data-id={news.id} key={idx}>
                  <td>{formatTime(news.createDate)}</td>
                  <td>{news.content?.title}</td>
                  <td className="actions">
                    <Link
                      to={`/admin/news/edit`}
                      className="edit btn"
                      state={news}
                    >
                      Изменить
                    </Link>
                    <button className="delete btn" onClick={() => { setNewsId(news.id); setModalConfirmDeleteActive(true) }}>
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
      <h2 className="popup__title title">Вы действительно хотите удалить новость?</h2>
        <div className="confirm-buttons">
          <button onClick={() => deleteNews(newsId)} className='confirm-button confirm-button_yes' disabled={isDeleteLoading} >
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

export default NewsAdmin;
