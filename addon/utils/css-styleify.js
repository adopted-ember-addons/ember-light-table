import Ember from 'ember';

const {
  isPresent,
  String: { dasherize, htmlSafe }
} = Ember;

export default function cssStyleify(hash = {}) {
  let styles = [];

  Object.keys(hash).forEach(key => {
    let value = hash[key];

    if(isPresent(value)) {
      styles.push(`${dasherize(key)}: ${hash[key]}`);
    }
  });

  return htmlSafe(styles.join('; '));
}
