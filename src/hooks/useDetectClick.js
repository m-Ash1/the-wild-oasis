import { useEffect, useRef } from "react";

function useDetectClick(handler, listenCapturing = true) {
  const ref = useRef();
  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        handler();
      }
    }
    function handleEscape(e) {
      if (e.key === "Escape") {
        handler();
      }
    }

    // the event will be handled in the capturing phase
    document.addEventListener("click", handleClick, listenCapturing);
    document.addEventListener("keydown", handleEscape, listenCapturing);
    return () => {
      document.removeEventListener("click", handleClick, listenCapturing);
    };
  }, [handler, listenCapturing]);

  return ref;
}

export default useDetectClick;
