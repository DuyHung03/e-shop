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
            console.log(res);
        };
        callAPI();
    }, []);
    return (
        <div className={cx('wrapper')}>
            <p>Catergories</p>
            {catergories.map((res) => (
                <Suspense
                    fallback={<div>...</div>}
                    key={res.id}
                >
                    <Catergories catergoryData={res}>
                        {res.name}
                    </Catergories>
                </Suspense>
            ))}
        </div>
    );
};

export default Sidebar;
