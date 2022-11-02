import { useEffect } from "react";
export function useOutsideAlerter(ref, toggleDropdown) {
  function handleClickOutside(event) {
    if (ref.current && !ref.current.contains(event.target)) {
      return toggleDropdown();
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });
}
