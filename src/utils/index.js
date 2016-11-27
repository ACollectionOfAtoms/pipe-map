export default {
  isElementInViewport(el) {
    // Adapted From:
    //http://stackoverflow.com/questions/123999/how-to-tell-if-a-dom-element-is-visible-in-the-current-viewport/7557433#7557433

    if (typeof jQuery === "function" && el instanceof jQuery) {
      el = el[0]
    }
    if (!el) {
      return false;
    }
    let rect = el.getBoundingClientRect()
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /*or $(window).height() */
      rect.right <= (window.innerWidth || document.documentElement.clientWidth) /*or $(window).width() */
    )
  }
}
