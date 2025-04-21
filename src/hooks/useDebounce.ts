import { useEffect, useState } from "react";

/**
 * Custom hook to debounce a value over a specified delay.
 * This is useful for delaying operations like API calls or search queries until the user has stopped typing.
 *
 * @template T The type of the value being debounced.
 * @param value The value to debounce.
 * @param delay The delay in milliseconds to wait before updating the debounced value. Defaults to 200ms.
 * @returns The debounced value.
 */
const useDebounce = <T>(value: T, delay: number = 200): T => {
  // State to hold the debounced value
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // Set a timeout to update the debounced value after the specified delay
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cleanup function to clear the timeout if the component unmounts or the value/delay changes
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]); // Effect dependencies

  return debouncedValue;
};

export default useDebounce;
