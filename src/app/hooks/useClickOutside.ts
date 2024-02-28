import { RefObject, useEffect } from "react";

const useClickOutside = (
  ref: RefObject<HTMLElement>,
  handler: (event: MouseEvent | TouchEvent) => void,
) => {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      handler(event);
      event.stopPropagation();
    };
    document.addEventListener("click", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("click", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
};

export default useClickOutside;
