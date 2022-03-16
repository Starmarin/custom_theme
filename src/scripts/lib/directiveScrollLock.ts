/** This is meant for use when scroll locking interferes with position: sticky.
 * @param targetSelector - element you want to remove scrolling from
 * @param lockClass - class that removes scrolling
 * @param lockDelay - delays lock activation (eg. wait for an transition to complete)
 */
export default function directiveScrollLock(targetSelector = 'body', lockClass = 'scroll-lock', lockDelay = 300) {
  const lockTarget = document.querySelector(targetSelector);
  let lastScrollPostition: [number, number];
  let timerId = 0;

  function setLock(state: boolean) {
    if (state) {
      // save scroll position and lock
      lastScrollPostition = [window.scrollX, window.scrollY];
      timerId = window.setTimeout(() => {
        lockTarget?.classList.add(lockClass);
      }, lockDelay);
    } else {
      // unlock and restore position
      window.clearTimeout(timerId);
      lockTarget?.classList.remove(lockClass);
      window.scrollTo.apply(null, lastScrollPostition);
    }
  }

  return {
    bind(el, { value }) {
      if (value) {
        setLock(value);
      }
    },
    update(el, { value, oldValue }) {
      if (value !== oldValue) {
        setLock(value);
      }
    },
  } as Vue.DirectiveOptions;
}
