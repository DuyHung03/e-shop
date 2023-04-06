/* This code is creating an instance of the Axios library with a base URL of
'https://api.escuelajs.co/api/v1/'. It also exports a function called `get` that takes a path and an
optional options object as parameters. The `get` function uses the Axios instance to make a GET
request to the specified path with the provided options, and returns the response data. */
import axios from 'axios';

export const request = axios.create({
    baseURL: 'https://api.escuelajs.co/api/v1/',
});

export const get = async (path, option = {}) => {
    const res = await request.get(path, option);
    return res.data;
};
