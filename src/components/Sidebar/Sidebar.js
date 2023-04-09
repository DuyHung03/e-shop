import React, {
    Suspense,
    lazy,
    useEffect,
    useState,
} from 'react';
import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
import getCatergories from '../../services/getCatergories';
const Catergories = lazy(() =>
    import('../Catergories/Catergories'),
);

const cx = classNames.bind(styles);

const Sidebar = () => {
    const [catergories, setCatergories] = useState([]);
    useEffect(() => {
        const callAPI = async () => {
            const res = await getCatergories();
            setCatergories(res);
            console.log(catergories);
        };
        callAPI();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <div className={cx('wrapper')}>
            {catergories.map((res) => (
                <Suspense
                    fallback={<div>...</div>}
                    key={res.id}
                >
                    <Catergories>{res.name}</Catergories>
                </Suspense>
            ))}
        </div>
    );
};

export default Sidebar;
