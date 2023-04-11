import React, { useContext } from 'react';
import { Pagination } from 'antd';
import { AppContext } from '../../context/AppProvider';

const Paginate = ({ data = [], pageSize }) => {
    const { setCurrentPage, currentPage } =
        useContext(AppContext);

    /**
     * The onPageChange function sets the current page and logs it to the console.
     * @param page - The `page` parameter is a variable that represents the new page number that the
     * user has selected. It is passed as an argument to the `onPageChange` function.
     */
    const onPageChange = (page) => {
        setCurrentPage(page);
        console.log(currentPage);
    };

    return (
        <div>
            <Pagination
                total={data.length}
                pageSize={pageSize}
                current={currentPage}
                onChange={onPageChange}
                showSizeChanger={false}
            />
        </div>
    );
};

export default Paginate;
