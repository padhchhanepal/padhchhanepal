
import { useState, useEffect } from "react";

interface UseSectionVisibilityOptions {
  threshold?: number;
  elementId: string;
}

export function useSectionVisibility({ 
  threshold = 0.1, 
  elementId 
}: UseSectionVisibilityOptions) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    const element = document.getElementById(elementId);
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, [elementId, threshold]);

  return isVisible;
}
