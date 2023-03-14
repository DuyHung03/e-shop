import axios from 'axios';

export const request = axios.create({
    baseURL: 'https://api.escuelajs.co/api/v1/',
});

export const get = async (path, option = {}) => {
    const res = await request.get(path, option);
    return res.data;
};
