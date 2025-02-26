import { useEffect, useRef } from "react";

function useCloseModel(closeFun, listeningAtCapture = true) {
  const ref = useRef();
  useEffect(
    function () {
      function handleClick(e) {
        if (ref.current && !ref.current.contains(e.target)) {
          // console.log("cicked outside");
          closeFun();
        }
      }
      document.addEventListener("click", handleClick, listeningAtCapture);
      return () =>
        document.removeEventListener("click", handleClick, listeningAtCapture);
    },
    [closeFun, listeningAtCapture]
  );

  return ref;
}

export default useCloseModel;
