import { isEmpty } from '@ember/utils';
import { A as emberArray } from '@ember/array';
import { observer } from '@ember/object';
import { on } from '@ember/object/evented';

/**
 * Makes sure that there is at most one flag that is set in the array.
 */
export default function(arrayName, flagName) {
  let i = -1; // previous index
  let f = function() {
    let a = this.get(arrayName);
    if (!isEmpty(a)) {
      let on = emberArray(a.filterBy(flagName));
      let n = on.get('length');
      if (n !== 0) {
        if (n > 1 && i >= 0 && i <= a.get('length')) {
          // removes the last object that had a flag that is still "on"
          let e = a.objectAt(i);
          e.set(flagName, false);
          on.removeObject(e);
          n--;
        }
        for (let j = 1; j < n; j++) {
          on.objectAt(j).set(flagName, false);
        }
        let on0 = on.objectAt(0);
        i = a.indexOf(on0);
      }
    }
  };
  let running = false;
  return on(
    'init',
    observer(`${arrayName}.[]`, `${arrayName}.@each.${flagName}`, function() {
      if (!running) {
        running = true;
        try {
          f.call(this);
        } finally {
          running = false;
        }
      }
    })
  );
}
