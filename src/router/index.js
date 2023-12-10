import Main from "../pages/Main"
import AllNews from "../pages/AllNews"
import NewsPage from "../pages/NewsPage"
import PageContent from "../pages/PageContent"
import Login from "../pages/Login"

import AdminMain from "../pages/admin/AdminMain"
import NewsAdmin from "../pages/admin/news/NewsAdmin"
import PartnersAdmin from "../pages/admin/partners/PartnersAdmin"
import CreateNews from "../pages/admin/news/CreateNews"

export const publicRoutes = [
    {path: '/', element: <Main />, exact: true},
    {path: '/news', element: <AllNews />, exact: true},
    {path: '/news/:id', element: <NewsPage />, exact: true},
    {path: '/login', element: <Login />, exact: true},
    {path: '/:pagename(^(?!.*admin).*$)', element: <PageContent />, exact: true}
]

export const privateRoutes = [
    {path: '/admin', element: <AdminMain />, exact: true},
    {path: '/admin/news', element: <NewsAdmin />, exact: true},
    {path: '/admin/news/create', element: <CreateNews />, exact: true},
    {path: '/admin/partners', element: <PartnersAdmin />, exact: true}
]