import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import styles from './Button.module.scss';

const cx = classNames.bind(styles);

const Button = ({
    //*SIZE
    //*TYPES
    actionType,
    menuType,
    //*
    leftIcon,
    rightIcon,
    className,
    id,
    to = false,
    href = false,
    target,
    onClick,
    children,
    ...passProps
}) => {
    let Btn = 'button';

    const classes = cx(
        'wrapper',
        {
            leftIcon,
            rightIcon,
            actionType,
            menuType,
        },
        className,
    );

    const props = { ...passProps, onClick };

    if (to) {
        props.to = to;
        Btn = Link;
    } else if (href) {
        props.href = href;
        Btn = 'a';
        props.target = target;
    }

    return (
        <Btn id={id} className={classes} {...props}>
            {leftIcon && (
                <span className={cx('icon')}>
                    {leftIcon}
                </span>
            )}
            <span className={cx('title')}>{children}</span>
            {rightIcon && (
                <span className={cx('icon')}>
                    {rightIcon}
                </span>
            )}
        </Btn>
    );
};

export default Button;
