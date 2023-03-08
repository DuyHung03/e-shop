import { Route, Routes } from 'react-router-dom';
import AuthProvider from './context/AuthProvider';
import Layout from './layout/Layout';
import { PublicRoutes } from './routes/routes';

function App() {
    return (
        <AuthProvider>
            <div className="App">
                <Routes>
                    {PublicRoutes.map((route, index) => {
                        const Page = route.element;
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                            />
                        );
                    })}
                </Routes>
            </div>
        </AuthProvider>
    );
}

export default App;
