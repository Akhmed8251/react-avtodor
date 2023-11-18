import Main from "../pages/Main"
import AllNews from "../pages/AllNews"
import NewsPage from "../pages/NewsPage"
import PageContent from "../pages/PageContent"

export const publicRoutes = [
    {path: '/', element: <Main />, exact: true},
    {path: '/news', element: <AllNews />, exact: true},
    {path: '/news/:id', element: <NewsPage />, exact: true},
    {path: '/:pagename', element: <PageContent />, exact: true}
]