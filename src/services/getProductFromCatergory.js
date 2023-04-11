import { request } from '../utils/httpRequest';

/**
 * This is an asynchronous function that retrieves products from a specific category with optional
 * parameters for offset and limit.
 * @param caterId - The ID of the category from which you want to retrieve products.
 * @param [offset=0] - The starting index of the products to be returned from the category. It is an
 * optional parameter and its default value is 0.
 * @param [limit=0] - The limit parameter is used to specify the maximum number of products to be
 * returned in the response. If not specified, it defaults to 0, which means that all products in the
 * category will be returned.
 * @returns The function `getProductFromCatergory` is returning the data obtained from a GET request to
 * the endpoint `categories//products`, with optional parameters `offset` and `limit`. The
 * data is returned as a Promise, which resolves to the response data if the request is successful, or
 * logs an error to the console if the request fails.
 */
const getProductFromCatergory = async (
    caterId,
    offset = 0,
    limit = 0,
) => {
    try {
        const res = await request.get(
            `categories/${caterId}/products`,
            {
                method: 'GET',
                params: {
                    offset: offset,
                    limit: limit,
                },
            },
        );
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export default getProductFromCatergory;
