import Cart from '../pages/Cart/Cart';
import Home from '../pages/Home/Home';
import Login from '../pages/auth/Login/Login';
import Product from '../pages/Product/Product';
import Search from '../pages/Search/Search';
import SignUpForm from '../pages/auth/SignUpForm/SignUpForm';
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
        path: '/search/:productName',
        element: Search,
    },
    {
        path: '/user/:userId',
        element: User,
    },
    {
        path: '/login',
        element: Login,
        toAuth: true,
        title: 'Login',
    },
    {
        path: '/sign-up-form',
        element: SignUpForm,
        toAuth: true,
        title: 'Sign Up',
    },

    {
        path: '/product/:productId/:title',
        element: Product,
    },
];
