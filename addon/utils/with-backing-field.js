import { computed } from '@ember/object';

export default function withBackingField(backingField, f) {
  return computed({
    get() {
      if (!this[backingField]) {
        this[backingField] = f.call(this);
      }
      return this[backingField];
    },
    set(key, value) {
      this[backingField] = value;
      return value;
    }
  });
}

