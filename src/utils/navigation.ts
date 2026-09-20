/**
 * Robust, cross-browser navigation and scrolling helper.
 * Designed to work seamlessly in desktop, mobile, and iframe preview environments.
 */
export function scrollToSection(sectionId: string, event?: React.MouseEvent): void {
  if (event) {
    event.preventDefault();
  }

  const cleanId = sectionId.replace('#', '');
  const element = document.getElementById(cleanId);

  if (element) {
    try {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } catch {
      const yOffset = -75;
      const y = element.getBoundingClientRect().top + (window.pageYOffset || document.documentElement.scrollTop || 0) + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }

    try {
      window.history.replaceState(null, '', `#${cleanId}`);
    } catch {
      // noop
    }
  } else {
    window.location.hash = `#${cleanId}`;
  }
}
