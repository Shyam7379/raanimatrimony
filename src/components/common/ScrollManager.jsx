import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Handles smooth scrolling to section hashes or top of page on route and hash changes.
 */
export function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const targetId = hash.replace('#', '');
      
      const scrollToElement = () => {
        const elem = document.getElementById(targetId);
        if (elem) {
          const navOffset = 85;
          const elementPosition = elem.getBoundingClientRect().top + window.pageYOffset;
          const offsetPosition = Math.max(0, elementPosition - navOffset);

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
          return true;
        }
        return false;
      };

      // Try immediately
      if (!scrollToElement()) {
        // If element is not rendered yet, retry after short intervals
        const timer1 = setTimeout(scrollToElement, 100);
        const timer2 = setTimeout(scrollToElement, 300);
        return () => {
          clearTimeout(timer1);
          clearTimeout(timer2);
        };
      }
    } else {
      // If no hash, scroll to top on page change
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  }, [pathname, hash]);

  return null;
}

/**
 * Utility helper to scroll directly to a section ID with sticky header offset
 */
export function scrollToSection(sectionId, updateHash = true) {
  if (sectionId === 'top' || sectionId === 'hero' || !sectionId) {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    if (updateHash && window.location.hash) {
      window.history.pushState(null, '', window.location.pathname);
    }
    return;
  }

  const cleanId = sectionId.replace('#', '');
  const elem = document.getElementById(cleanId);
  if (elem) {
    const navOffset = 85;
    const elementPosition = elem.getBoundingClientRect().top + window.pageYOffset;
    const offsetPosition = Math.max(0, elementPosition - navOffset);

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });

    if (updateHash) {
      window.history.pushState(null, '', `#${cleanId}`);
    }
  }
}
