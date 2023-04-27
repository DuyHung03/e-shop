import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import styles from './Button.module.scss';

const cx = classNames.bind(styles);

const Button = ({
    //*SIZE
    //*TYPES
    actionType,
    menuType,
    disable,
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
    /* `const classes = cx()` is using the `classnames` library to generate a string of CSS class names
    based on the provided arguments. In this case, it is combining the string `'wrapper'` with an
    object containing the boolean values of `leftIcon`, `rightIcon`, `actionType`, and `menuType`,
    as well as any additional `className` passed in as a prop. The resulting string of class names
    is then used to apply styles to the button element. */
    const classes = cx(
        'wrapper',
        {
            leftIcon,
            rightIcon,
            actionType,
            menuType,
            disable,
        },
        className,
    );

    /* `const props = { ...passProps, onClick };` is creating a new object called `props` that includes
    all the properties passed to the `Button` component via the `passProps` object, as well as an
    `onClick` property. */
    const props = { ...passProps, onClick };

    /* This code block is determining what type of HTML element the `Btn` variable should be set to
    based on the props passed to the `Button` component. */
    let Btn = 'button';
    if (to) {
        props.to = to;
        Btn = Link;
    } else if (href) {
        props.href = href;
        Btn = 'a';
        props.target = target;
    }

    return (
        <Btn
            id={id}
            className={classes}
            {...props}
            type="submit"
            disabled={disable}
        >
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
