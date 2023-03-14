import { request } from '../utils/httpRequest';

const searchProduct = async (keyword) => {
    try {
        const res = await request.get('products/', {
            method: 'GET',
            params: {
                title: keyword,
                offset: 0,
                limit: 10,
            },
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
    console.log('run');
};

export default searchProduct;
