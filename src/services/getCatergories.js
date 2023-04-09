import { request } from '../utils/httpRequest';

const getCatergories = async () => {
    try {
        const res = await request.get('categories', {
            method: 'GET',
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export default getCatergories;
