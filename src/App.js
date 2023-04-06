import { Route, Routes } from 'react-router-dom';
import AppProvider from './context/AppProvider';
import AuthProvider from './context/AuthProvider';
import AuthLayout from './layout/AuthLayout';
import Layout from './layout/Layout';
import { PublicRoutes } from './routes/routes';

function App() {
    return (
        <AuthProvider>
            <AppProvider>
                <div className="App">
                    <Routes>
                        {
                            /* This code is mapping over an array of public routes and returning a new
                        array of `Route` components with the appropriate layout and page component
                        based on the `toAuth` property of each route. */
                            PublicRoutes.map(
                                (route, index) => {
                                    const Page =
                                        route.element;
                                    var PageLayout;
                                    var title;
                                    if (route.toAuth) {
                                        PageLayout =
                                            AuthLayout;
                                        title = route.title;
                                    } else {
                                        PageLayout = Layout;
                                    }

                                    return (
                                        <Route
                                            key={index}
                                            path={
                                                route.path
                                            }
                                            element={
                                                <PageLayout
                                                    title={
                                                        title
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
                </div>
            </AppProvider>
        </AuthProvider>
    );
}

export default App;
