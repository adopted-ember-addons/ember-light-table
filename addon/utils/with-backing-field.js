import { computed } from '@ember/object';

export default function withBackingField(backingField, f) {
  return computed(function() {
    if (!this[backingField]) {
      this[backingField] = f.call(this);
    }
    return this[backingField];
  });
}

