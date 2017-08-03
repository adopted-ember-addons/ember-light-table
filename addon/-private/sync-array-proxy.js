import ArrayProxy from '@ember/array/proxy';
import { assert } from '@ember/debug';
import { isArray } from '@ember/array';

const EMPTY_ARRAY = [];

export default ArrayProxy.extend({
  /**
   * The model that will be synchronized to the content of this proxy
   * @property syncArray
   * @type {Array}
   */
  syncArray: null,

  /**
   * @property syncEnabled
   * @type {Boolean}
   */
  syncEnabled: true,

  init() {
    this._super(...arguments);

    let syncArray = this.get('syncArray');

    assert('[ember-light-table] enableSync requires the passed array to be an instance of Ember.A', isArray(syncArray) && typeof syncArray.addArrayObserver === 'function');

    syncArray.addArrayObserver(this, {
      willChange: 'syncArrayWillChange',
      didChange: 'syncArrayDidChange'
    });
  },

  destroy() {
    this.get('syncArray').removeArrayObserver(this, {
      willChange: 'syncArrayWillChange',
      didChange: 'syncArrayDidChange'
    });

    this.setProperties({
      syncArray: null,
      content: null
    });
  },

  /**
   * Serialize objects before they are inserted into the content array
   * @method serializeContentObjects
   * @param {Array} objects
   * @return {Array}
   */
  serializeContentObjects(objects) {
    return objects;
  },

  /**
   * Serialize objects before they are inserted into the sync array
   * @method serializeSyncArrayObjects
   * @param {Array} objects
   * @return {Array}
   */
  serializeSyncArrayObjects(objects) {
    return objects;
  },

  syncArrayWillChange() { /* Not needed */ },

  syncArrayDidChange(syncArray, start, removeCount, addCount) {
    let content = this.get('content');
    let objectsToAdd = EMPTY_ARRAY;

    if (!this.get('syncEnabled')) {
      return;
    }

    if (addCount > 0) {
      objectsToAdd = this.serializeContentObjects(syncArray.slice(start, start + addCount));
    }

    content.replace(start, removeCount, objectsToAdd);
  },

  replaceContent(start, removeCount, objectsToAdd) {
    let syncArray = this.get('syncArray');

    if (!this.get('syncEnabled')) {
      return this._super(...arguments);
    }

    syncArray.replace(start, removeCount, this.serializeSyncArrayObjects(objectsToAdd));
  }
});
