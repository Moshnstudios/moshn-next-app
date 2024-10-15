import { useState } from "react";

export default function useScrollLock() {
  const [isLocked, setLockScroll] = useState(false);

  function setScroll(
    action?: "lock" | "scroll",
    backDrop?: {
      zIndex: number;
    },
  ) {
    const overlay = document.getElementById("overlay");

    if (action === "lock") {
      setLockScroll(true);
      document.body.classList.add("locked");
    }

    if (action === "scroll") {
      setLockScroll(false);
      document.body.classList.remove("locked");
    }

    if (backDrop) {
      if (!overlay) return;

      overlay.style.zIndex = backDrop.zIndex.toString();
      overlay.style.display = "block";
      overlay.style.opacity = "1";
    } else if (!backDrop) {
      if (!overlay) return;

      overlay.style.zIndex = "0";
      overlay.style.display = "none";
    }
  }

  return { setScroll, isLocked };
}
