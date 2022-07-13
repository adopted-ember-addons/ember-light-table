export default function hasClass(elem, cls) {
  return [...elem.classList]
    .filter((cssClass) => cssClass === cls)
    .reduce((bool, next) => bool || next, false);
}
