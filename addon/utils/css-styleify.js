import { dasherize, htmlSafe } from '@ember/string';
import { isPresent } from '@ember/utils';

export default function cssStyleify(hash = {}) {
  let styles = [];

  Object.keys(hash).forEach((key) => {
    let value = hash[key];

    if (isPresent(value)) {
      styles.push(`${dasherize(key)}: ${value}`);
    }
  });

  return htmlSafe(styles.join('; '));
}
