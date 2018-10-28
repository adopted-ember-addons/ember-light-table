
/**
 * A polyfill for jQuery .closest() method
 * @param  { Object } el     Dom element to start from
 * @param  { String } selector Selector to match
 * @return { Object }          The closest matching node or null
 */
const closest = (el, selector) => {
  let parent;
  while (el) {
    parent = el.parentElement;
    if (parent && parent.matches(selector)) {
      return parent;
    }
    el = parent;
  }
  return null;
};

export default closest;
