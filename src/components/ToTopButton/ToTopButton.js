import React, { useState } from 'react';

const ToTopButton = () => {
    const [showButton, setShowButton] = useState(false);

    const handleScroll = () => {
        const currentScrollPos = window.pageYOffset;
        setShowButton(currentScrollPos > 100);
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    window.addEventListener('scroll', handleScroll);

    return (
        <>
            {showButton && (
                <button
                    onClick={scrollToTop}
                    className="to-top-button"
                >
                    To Top
                </button>
            )}
        </>
    );
};

export default ToTopButton;
