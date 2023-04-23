import { useContext } from 'react';
import { AppContext } from '../../context/AppProvider';

const Cart = () => {
    const { cart } = useContext(AppContext);
    return (
        <div>
            {cart &&
                cart.map((prd) => prd.currentProduct.id)}
        </div>
    );
};

export default Cart;
