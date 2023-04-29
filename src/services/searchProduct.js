/**
 * This is a JavaScript function that searches for products based on a keyword and limit using an HTTP
 * GET request.
 * param keyword - The keyword parameter is a string that represents the search term or query that the
 * user is looking for in the products.
 * param limit - The limit parameter is used to specify the maximum number of results that should be
 * returned by the API call. In this code, it is passed as a parameter to the API endpoint to limit the
 * number of products returned in the search result.
 * returns The function `searchProduct` is returning the data obtained from the API call made using
 * the `request` utility function. The data returned is the result of searching for products with a
 * given `keyword` and a specified `limit`. If the API call fails, the function logs the error to the
 * console.
 */
import { request } from '../utils/httpRequest';

const searchProduct = async (
    keyword,
    offset = 0,
    limit = 0,
) => {
    try {
        const res = await request.get('products/', {
            method: 'GET',
            params: {
                title: keyword,
                offset: offset,
                limit: limit,
            },
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export default searchProduct;
