import { request } from '../utils/httpRequest';

const getCatergories = async (limit) => {
    try {
        const res = await request.get('categories', {
            method: 'GET',
            params: {
                limit: limit,
            },
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export default getCatergories;
