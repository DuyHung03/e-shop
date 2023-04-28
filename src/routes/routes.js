import { lazy } from 'react';

const NotFound = lazy(() =>
    import('../pages/NotFound/NotFound'),
);

const Home = lazy(() => import('../pages/Home/Home'));
const Cart = lazy(() => import('../pages/Cart/Cart'));
const Login = lazy(() =>
    import('../pages/auth/Login/Login'),
);
const Product = lazy(() =>
    import('../pages/Product/Product'),
);
const Search = lazy(() => import('../pages/Search/Search'));
const SignUpForm = lazy(() =>
    import('../pages/auth/SignUpForm/SignUpForm'),
);
const User = lazy(() => import('../pages/User/User'));

export const PublicRoutes = [
    {
        path: '/',
        element: Home,
        exact: true,
        isSideBar: true,
    },
    {
        path: '/cart/:uid',
        element: Cart,
    },
    {
        path: '/search/:productName',
        element: Search,
        isSideBar: true,
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
    {
        path: '*',
        element: NotFound,
        toAuth: true,
    },
];
