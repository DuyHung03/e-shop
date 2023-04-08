import { useEffect, useState } from 'react';

/**
 * This is a custom hook that returns a debounced value based on the input value and delay.
 * @param value - The value that needs to be debounced. This can be any data type such as a string,
 * number, object, or array.
 * @param delay - The delay parameter is the amount of time in milliseconds that the function should
 * wait before updating the state with the new value. This is used to debounce the input and prevent
 * unnecessary re-renders or API calls.
 * @returns The `useDebounce` hook returns the `debounce` state variable, which is updated with the
 * `value` passed as argument after a delay of `delay` milliseconds. The purpose of this hook is to
 * debounce the value passed as argument, meaning that it delays its update until a certain amount of time has passed without any new updates.
 */
const useDebounce = (value, delay) => {
    const [debounce, setDebounce] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebounce(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debounce;
};

export default useDebounce;
