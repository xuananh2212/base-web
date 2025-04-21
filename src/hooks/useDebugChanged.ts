import { useEffect, useRef } from "react";

function useDebugChanged<T extends object>(props: T, componentName: string) {
  const previousPropsRef = useRef<T>(props);

  useEffect(() => {
    const changedProps: Partial<T> = {};

    for (const key in props) {
      if (props[key] !== previousPropsRef.current[key]) {
        changedProps[key] = props[key];
      }
    }

    if (Object.keys(changedProps).length > 0) {
      console.log(`[${componentName}] Props that changed memory address:`, changedProps);
    }

    previousPropsRef.current = props;
  }, [props, componentName]);
}

export default useDebugChanged;
