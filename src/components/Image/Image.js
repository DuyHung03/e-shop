import React from 'react';

const Image = ({ src, className, onClick }) => {
    return (
        <img
            src={src}
            className={className}
            onClick={onClick}
            alt=""
        />
    );
};

export default Image;
