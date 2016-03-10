export default function createClickEvent(opts = {}) {
  let e = $.Event('click');
  Object.keys(opts).forEach(o => e[o] = opts[o]);
  return e;
}
