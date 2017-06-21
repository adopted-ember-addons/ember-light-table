export default function createClickEvent(opts = {}) {
  let e = new $.Event('click');
  Object.keys(opts).forEach((o) => e[o] = opts[o]);
  return e;
}
