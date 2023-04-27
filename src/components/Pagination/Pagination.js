import React, { useContext } from 'react';
import { Pagination } from 'antd';
import { AppContext } from '../../context/AppProvider';

const Paginate = ({ data = [], pageSize, className }) => {
    const { setCurrentPage, currentPage } =
        useContext(AppContext);

    /**
     * The function onPageChange sets the current page and scrolls to the top of the page while logging
     * the current page number.
     * @param page - The parameter "page" is a variable that represents the new page number that the
     * user has selected. It is passed as an argument to the onPageChange function.
     */
    const onPageChange = (page) => {
        setCurrentPage(page);
        window.scrollTo({
            top: 0,
        });
    };

    return (
        <div>
            <Pagination
                total={data.length}
                pageSize={pageSize}
                current={currentPage}
                onChange={onPageChange}
                showSizeChanger={false}
                className={className}
            />
        </div>
    );
};

export default Paginate;
