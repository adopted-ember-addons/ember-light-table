import getCmdKey from 'ember-keyboard/utils/get-cmd-key';

function sortedKeys(keyArray) {
  return keyArray.sort().join('+');
}

/*
 * Generates an event name from the type of event and the key
 * modifiers of the event.
 *
 * modified from ember-keyboard
 * _none is new
 */
export default function listenerName(type, keyArray) {
  let keys;
  if (keyArray) {
    if (keyArray.indexOf('cmd') > -1) {
      keyArray[keyArray.indexOf('cmd')] = getCmdKey();
    }
    keys = keyArray.length === 0 ? '_none' : sortedKeys(keyArray);
  } else {
    keys = '_all';
  }
  return `${type}:${keys}`;
}

