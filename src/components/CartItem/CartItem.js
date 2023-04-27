import classNames from 'classnames/bind';
import styles from './CartItem.module.scss';
import Button from '../Button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faPlus,
    faSubtract,
    faXmarkCircle,
} from '@fortawesome/free-solid-svg-icons';
import {
    Suspense,
    lazy,
    useCallback,
    useContext,
    useState,
} from 'react';
import { AppContext } from '../../context/AppProvider';
import { Skeleton, Tooltip } from 'antd';
import {
    collection,
    deleteDoc,
    doc,
    getDocs,
    query,
    updateDoc,
    where,
} from 'firebase/firestore';
import { db } from '../../firebase/firebase';
const Image = lazy(() => import('../Image/Image'));

const cx = classNames.bind(styles);

const CartItem = ({ productData = {} }) => {
    const product = productData.product;

    const { setTotal, setSelected } =
        useContext(AppContext);

    const [isChecked, setIsChecked] = useState(false);

    /* `handleChooseProduct` is a function that toggles the `isChecked` state and updates the total and
   selected quantity of products in the cart based on whether the product is checked or unchecked.
   It is wrapped in `useCallback` to memoize the function and prevent unnecessary re-renders. The
   dependencies array `[setIsChecked, isChecked, product.price, setTotal, setSelected,
   productData.quantity]` ensures that the function is only re-created if any of these values
   change. */
    const handleChooseProduct = useCallback(() => {
        setIsChecked(!isChecked);
        if (!isChecked) {
            setTotal(
                (prev) =>
                    prev +
                    product.price * productData.quantity,
            );
            setSelected(
                (prev) => prev + productData.quantity,
            );
        } else {
            setTotal(
                (prev) =>
                    prev -
                    product.price * productData.quantity,
            );
            setSelected(
                (prev) => prev - productData.quantity,
            );
        }
    }, [
        setIsChecked,
        isChecked,
        product.price,
        setTotal,
        setSelected,
        productData.quantity,
    ]);

    const handleIncrease = async () => {
        const querySnapshot = await getDocs(
            query(
                collection(db, 'cart'),
                where('product.id', '==', product.id),
            ),
        );
        const docRef = querySnapshot.docs[0].ref;
        await updateDoc(docRef, {
            quantity:
                querySnapshot.docs[0].data().quantity + 1,
        });
        console.log('updated');
    };

    /**
     * The above code defines two async functions to handle decreasing the quantity of a product in a
     * cart and deleting a product from the cart in a Firestore database.
     */
    const handleDecrease = async () => {
        const querySnapshot = await getDocs(
            query(
                collection(db, 'cart'),
                where('product.id', '==', product.id),
            ),
        );
        const docRef = querySnapshot.docs[0].ref;
        await updateDoc(docRef, {
            quantity:
                querySnapshot.docs[0].data().quantity - 1,
        });
        console.log('updated');
    };

    const handleDelete = async () => {
        await deleteDoc(doc(db, 'cart', productData.id));
    };

    return (
        <div className={cx('wrapper')}>
            <input
                type="checkbox"
                checked={isChecked}
                onChange={handleChooseProduct}
            />
            <Suspense fallback={<Skeleton.Image active />}>
                <Image
                    src={product.images[0]}
                    className={cx('image')}
                    onClick={handleChooseProduct}
                />
            </Suspense>
            <p
                className={cx('title')}
                onClick={handleChooseProduct}
            >
                {product.title}
            </p>
            <span
                className={cx('price')}
                onClick={handleChooseProduct}
            >
                <span>Unit Price:</span>${product.price}
            </span>
            <div className={cx('quantity')}>
                <Button
                    className={cx('increase')}
                    onClick={handleIncrease}
                    disable={isChecked ? true : false}
                >
                    <FontAwesomeIcon icon={faPlus} />
                </Button>
                <span>{productData.quantity}</span>
                <Button
                    className={cx('decrease')}
                    onClick={handleDecrease}
                    disable={isChecked ? true : false}
                >
                    <FontAwesomeIcon icon={faSubtract} />
                </Button>
            </div>
            <Tooltip
                title="Delete product"
                mouseEnterDelay={1}
            >
                <Button
                    className={cx('delete')}
                    onClick={handleDelete}
                >
                    <FontAwesomeIcon icon={faXmarkCircle} />
                </Button>
            </Tooltip>
        </div>
    );
};

export default CartItem;
