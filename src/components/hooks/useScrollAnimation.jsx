// ======================================================
// Srikrishn Organics - useScrollAnimation Hook
// ======================================================

import { useEffect, useRef, useState } from "react";

// ======================================================
// useScrollAnimation
// ======================================================

const useScrollAnimation = (options = {}) => {
  const {
    threshold = 0.15,
    rootMargin = "0px 0px -50px 0px",
    triggerOnce = true,
  } = options;

  // ----------------------------------------------------
  // Reference for the element
  // ----------------------------------------------------

  const ref = useRef(null);

  // ----------------------------------------------------
  // Track whether element is visible
  // ----------------------------------------------------

  const [isVisible, setIsVisible] = useState(false);

  // ----------------------------------------------------
  // Intersection Observer
  // ----------------------------------------------------

  useEffect(() => {
    const element = ref.current;

    if (!element) {
      return;
    }

    // Check browser support
    if (!("IntersectionObserver" in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);

          // Stop observing after first appearance
          if (triggerOnce) {
            observer.unobserve(element);
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(element);

    // Cleanup observer
    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, triggerOnce]);

  // ----------------------------------------------------
  // Return reference and visibility state
  // ----------------------------------------------------

  return {
    ref,
    isVisible,
  };
};

export default useScrollAnimation;

