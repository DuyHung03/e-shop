import { request } from '../utils/httpRequest';

const searchProduct = async (keyword, limit) => {
    try {
        const res = await request.get('products/', {
            method: 'GET',
            params: {
                title: keyword,
                offset: 0,
                limit: limit,
            },
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export default searchProduct;
