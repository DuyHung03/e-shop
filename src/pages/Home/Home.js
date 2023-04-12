import React, {
    Suspense,
    lazy,
    useContext,
    useEffect,
    useState,
} from 'react';
import searchProduct from '../../services/searchProduct';
import { AppContext } from '../../context/AppProvider';
import Paginate from '../../components/Pagination/Pagination';
const ProductList = lazy(() =>
    import('../../components/ProductList/ProductList'),
);

const Home = () => {
    const { currentPage, pageSize, currentProducts } =
        useContext(AppContext);

    const [products, setProducts] = useState([]);

    /* `useEffect` is a hook in React that allows you to perform side effects in functional components.
    In this code, it is used to call an API to fetch products and set the state of `products` using
    `setProducts` when the component mounts. The second argument `[]` is an empty array, which means
    that the effect will only run once when the component mounts and not on subsequent re-renders.
    */
    useEffect(() => {
        const callAPI = async () => {
            const res = await searchProduct(
                '',
                currentPage,
                0,
            );
            setProducts(res);
            console.log(res.length);
        };
        callAPI();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            <Suspense fallback={<div>...</div>}>
                <ProductList
                    cutData={currentProducts(products)}
                    data={products}
                />
            </Suspense>
        </div>
    );
};

export default Home;
