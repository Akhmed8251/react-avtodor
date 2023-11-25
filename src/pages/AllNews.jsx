import { useState, useEffect } from 'react'
import NewsService from '../api/NewsService'
import { formatTime } from '../utils/time'
import { FILES_URL } from '../api/config'
import { Link } from 'react-router-dom'
import {useFetching}  from '../hooks/useFetching'

const AllNews = () => {
  const [allNews, setAllNews] = useState([])
  const [getAllNews, isAllNewsLoading, allNewsErr] = useFetching(async () => {
    const response = await NewsService.getAllNews()
    if (response.status === 200) {
      setAllNews(response.data)
    } else {
      console.log(allNewsErr)
    }
  })

  useEffect(() => {
    getAllNews()
  }, [])

  return (
    <section className="news">
        <div className="news__container container">
            <h2 className="news__title title">ВСЕ НОВОСТИ</h2>
            <ul className='news__list'>
              {
                isAllNewsLoading ? <div>Загрузка...</div>
                  :
                    allNews.map((news, idx) => (
                      <li key={idx} className='news__item news-item'>
                        <Link to={`/news/${news.id}`} className="news-item__link">
                          <div className="news-item__image">
                              <img src={`${FILES_URL}${news.mainImageFileName}`} alt="" />
                          </div>
                          <h3 className="news-item__title">{news.mainText}</h3>
                          <time datetime={formatTime(news.createDate)} className="news-item__date">{formatTime(news.createDate)}</time>
                        </Link>
                      </li>
                    ))
                }
            </ul>
        </div>
    </section>
  )
}

export default AllNews