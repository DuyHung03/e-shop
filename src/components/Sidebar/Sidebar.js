import React, {
    Suspense,
    lazy,
    useEffect,
    useState,
} from 'react';
import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
import getCatergories from '../../services/getCatergories';
import Button from '../Button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faChevronDown,
    faChevronUp,
} from '@fortawesome/free-solid-svg-icons';
const Catergories = lazy(() =>
    import('../Catergories/Catergories'),
);

const cx = classNames.bind(styles);

const Sidebar = ({ className }) => {
    const [catergories, setCatergories] = useState([]);
    const [showMoreButton, setShowMoreButton] =
        useState(true);

    /**
     * This function calls an API to retrieve categories and sets them using React's useState hook.
     * @param limit - The `limit` parameter is a number that specifies the maximum number of categories
     * to be returned by the `getCatergories` function. It is used in the `callAPI` function to fetch
     * categories and set them using the `setCatergories` function. In this case, the
     */
    const callAPI = async (limit) => {
        const res = await getCatergories(limit);
        setCatergories(res);
        console.log(res);
    };
    useEffect(() => {
        callAPI(10);
    }, []);

    /**
     * The above code defines two functions to handle the "see more" and "see less" actions for a list
     * of categories.
     */
    const handleSeeMoreCatergories = () => {
        callAPI(0);
        setTimeout(() => {
            setShowMoreButton(false);
        }, 1000);
    };
    const handleSeeLessCatergories = () => {
        callAPI(10);
        setTimeout(() => {
            setShowMoreButton(true);
        }, 1000);
    };
    return (
        <div className={cx('wrapper', className)}>
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

            {showMoreButton ? (
                <Button
                    className={cx('see-more')}
                    onClick={handleSeeMoreCatergories}
                >
                    <FontAwesomeIcon icon={faChevronDown} />
                </Button>
            ) : (
                <Button
                    className={cx('see-more')}
                    onClick={handleSeeLessCatergories}
                >
                    <FontAwesomeIcon icon={faChevronUp} />
                </Button>
            )}
        </div>
    );
};

export default Sidebar;
