import React, { useState, useEffect } from 'react';

const Image = ({
    src,
    fallbackSrc,
    className,
    onSuccess,
}) => {
    /* This code defines a React component called `Image` that renders an `img` element with a fallback
    source URL in case the original source URL fails to load. */
    const [imageSrc, setImageSrc] = useState(src);
    const [loaded, setLoaded] = useState(false);
    const [isFallback, setIsFallback] = useState(false);

    useEffect(() => {
        let timeoutId = setTimeout(() => {
            if (!loaded) {
                setIsFallback(true);
            }
        }, 5000);

        return () => clearTimeout(timeoutId);
    }, [loaded]);

    useEffect(() => {
        if (isFallback && imageSrc !== fallbackSrc) {
            setImageSrc(fallbackSrc);
        }
    }, [isFallback, fallbackSrc, imageSrc]);

    const onLoad = () => {
        setLoaded(true);
        if (onSuccess) {
            onSuccess();
        }
    };

    const onError = () => {
        setIsFallback(true);
    };

    return (
        <img
            src={src}
            className={className}
            onLoad={onLoad}
            onError={onError}
            alt=""
        />
    );
};

export default Image;
