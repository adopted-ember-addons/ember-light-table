import listenerName from 'ember-light-table/utils/listener-name';

const formattedListener = function formattedListener(type, keysString) {
  const keys = keysString !== undefined ? keysString.split('+') : [];
  return listenerName(type, keys);
};

export function rowMouseDown(keys) {
  return formattedListener('rowMouseDown', keys);
}

export function rowMouseUp(keys) {
  return formattedListener('rowMouseUp', keys);
}

export function rowMouseMove(keys) {
  return formattedListener('rowMouseMove', keys);
}

