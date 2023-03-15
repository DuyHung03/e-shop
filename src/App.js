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
                        {PublicRoutes.map(
                            (route, index) => {
                                const Page = route.element;
                                const PageLayout =
                                    route.toAuth
                                        ? AuthLayout
                                        : Layout;
                                return (
                                    <Route
                                        key={index}
                                        path={route.path}
                                        element={
                                            <PageLayout>
                                                <Page />
                                            </PageLayout>
                                        }
                                    />
                                );
                            },
                        )}
                    </Routes>
                </div>
            </AppProvider>
        </AuthProvider>
    );
}

export default App;
