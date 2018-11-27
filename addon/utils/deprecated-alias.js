import { computed } from '@ember/object';
import { deprecate } from '@ember/application/deprecations';

export default function(key, id, message, until) {
  return computed(key, {
    get() {
      return this.get(key);
    },
    set(k, value) {
      deprecate(message, false, { id, until });
      this.set(key, value);
      return value;
    }
  });
}

