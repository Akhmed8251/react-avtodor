import Main from "../pages/Main"
import AllNews from "../pages/AllNews"
import NewsPage from "../pages/NewsPage"
import Login from "../pages/Login"

import AdminMain from "../pages/admin/AdminMain"
import NewsAdmin from "../pages/admin/news/NewsAdmin"
import CreateNews from "../pages/admin/news/CreateNews"
import EditNews from "../pages/admin/news/EditNews"
import PartnersAdmin from "../pages/admin/partners/PartnersAdmin"
import CreatePartner from "../pages/admin/partners/CreatePartner"
import EditPartner from "../pages/admin/partners/EditPartner"
import AdvertisingsAdmin from "../pages/admin/advertising/AdvertisingsAdmin"
import CreateAdvertising from "../pages/admin/advertising/CreateAdvertising"
import ContactsAdmin from "../pages/admin/contacts/ContactsAdmin"
import CreateContact from "../pages/admin/contacts/CreateContact"
import EditContact from "../pages/admin/contacts/EditContact"
import PagesAdmin from "../pages/admin/pageContents/PagesAdmin"
import CreatePage from "../pages/admin/pageContents/CreatePage"
import EditAdvertising from "../pages/admin/advertising/EditAdvertising"
import AboutAdmin from "../pages/admin/about/AboutAdmin"
import EditAbout from "../pages/admin/about/EditAbout"
import AllMainMenuAdmin from "../pages/admin/main-menu/AllMainMenuAdmin"
import CreateMainMenu from "../pages/admin/main-menu/CreateMainMenu"
import EditMainMenu from "../pages/admin/main-menu/EditMainMenu"
import AllMenuAdmin from "../pages/admin/menu/AllMenuAdmin"
import CreateMenu from "../pages/admin/menu/CreateMenu"
import EditMenu from "../pages/admin/menu/EditMenu"
import EditPage from "../pages/admin/pageContents/EditPage"
import NotFound from "../pages/NotFound"
import UsersAdmin from "../pages/admin/users/UsersAdmin"
import CreateUser from "../pages/admin/users/CreateUser"
import EditUser from "../pages/admin/users/EditUser"

export const publicRoutes = [
    {path: '/', element: <Main />, exact: true},
    {path: '/news', element: <AllNews />, exact: true},
    {path: '/news/:id', element: <NewsPage />, exact: true},
    {path: '/login', element: <Login />, exact: true},
    {path: '/404', element: <NotFound />, exact: true}
]

export const privateRoutes = [
    {path: '/admin', element: <AdminMain />, exact: true},
    {path: '/admin/news', element: <NewsAdmin />, exact: true},
    {path: '/admin/news/create', element: <CreateNews />, exact: true},
    {path: '/admin/news/edit', element: <EditNews />, exact: true},
    {path: '/admin/partners', element: <PartnersAdmin />, exact: true},
    {path: '/admin/partner/create', element: <CreatePartner />, exact: true},
    {path: '/admin/partner/edit', element: <EditPartner />, exact: true},
    {path: '/admin/advertisings', element: <AdvertisingsAdmin />, exact: true},
    {path: '/admin/advertising/create', element: <CreateAdvertising />, exact: true},
    {path: '/admin/advertising/edit', element: <EditAdvertising />, exact: true},
    {path: '/admin/contacts', element: <ContactsAdmin />, exact: true},
    {path: '/admin/contact/create', element: <CreateContact />, exact: true},
    {path: '/admin/contact/edit', element: <EditContact />, exact: true},
    {path: '/admin/pages', element: <PagesAdmin />, exact: true},
    {path: '/admin/page/create', element: <CreatePage />, exact: true},
    {path: '/admin/page/edit', element: <EditPage />, exact: true},
    {path: '/admin/about', element: <AboutAdmin />, exact: true},
    {path: '/admin/about/edit', element: <EditAbout />, exact: true},
    {path: '/admin/all-main-menu', element: <AllMainMenuAdmin />, exact: true},
    {path: '/admin/main-menu/create', element: <CreateMainMenu />, exact: true},
    {path: '/admin/main-menu/edit', element: <EditMainMenu />, exact: true},
    {path: '/admin/all-menu', element: <AllMenuAdmin />, exact: true},
    {path: '/admin/menu/create', element: <CreateMenu />, exact: true},
    {path: '/admin/menu/edit', element: <EditMenu />, exact: true},
]

export const privateAdminRoutes = [
    ...privateRoutes,
    {path: '/admin/users', element: <UsersAdmin />, exact: true},
    {path: '/admin/user/create', element: <CreateUser />, exact: true},
    {path: '/admin/user/edit', element: <EditUser />, exact: true},
]