import Cart from '../pages/Cart/Cart';
import Home from '../pages/Home/Home';
import Login from '../pages/Login/Login';
import Search from '../pages/Search/Search';
import User from '../pages/User/User';

export const PublicRoutes = [
    {
        path: '/',
        element: Home,
    },
    {
        path: '/cart',
        element: Cart,
    },
    {
        path: '/search',
        element: Search,
    },
    {
        path: '/user',
        element: User,
    },
    {
        path: '/login',
        element: Login,
    },
];
