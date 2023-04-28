import { Route, Routes } from 'react-router-dom';
import AppProvider from './context/AppProvider';
import AuthProvider from './context/AuthProvider';
import { PublicRoutes } from './routes/routes';
import { Suspense, lazy } from 'react';
import Loading from './components/Loading/Loading';
const AuthLayout = lazy(() =>
    import('./layout/AuthLayout'),
);
const Layout = lazy(() => import('./layout/Layout'));

function App() {
    return (
        <AuthProvider>
            <AppProvider>
                <div className="App">
                    <Suspense fallback={<Loading />}>
                        <Routes>
                            {
                                /* This code is mapping over an array of public routes and returning a new
                        array of `Route` components with the appropriate layout and page component
                        based on the `toAuth` property of each route. */
                                PublicRoutes.map(
                                    (route) => {
                                        const Page =
                                            route.element;
                                        var PageLayout;
                                        var title;
                                        if (route.toAuth) {
                                            PageLayout =
                                                AuthLayout;
                                            title =
                                                route.title;
                                        } else {
                                            PageLayout =
                                                Layout;
                                        }

                                        return (
                                            <Route
                                                key={
                                                    route.path
                                                }
                                                path={
                                                    route.path
                                                }
                                                exact={
                                                    route.exact
                                                }
                                                element={
                                                    <PageLayout
                                                        title={
                                                            title
                                                        }
                                                        isSideBar={
                                                            route.isSideBar
                                                        }
                                                    >
                                                        <Page />
                                                    </PageLayout>
                                                }
                                            />
                                        );
                                    },
                                )
                            }
                        </Routes>
                    </Suspense>
                </div>
            </AppProvider>
        </AuthProvider>
    );
}

export default App;
