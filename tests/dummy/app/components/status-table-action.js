/* eslint ember/no-on-calls-in-components:off */
import Component from '@ember/component';
import { computed } from '@ember/object';
import { on } from '@ember/object/evented';

export default Component.extend({

  classNameBindings: [':table-action', ':fa', 'statusClass'],
  attributeBindings: ['title'],

  statusClassOn: 'fa-toggle-on',
  statusClassOff: 'fa-toggle-off',

  titleOn: null,
  titleOff: null,

  value: false,

  statusClass: computed('value', function() {
    return this.get('value') ? this.get('statusClassOn') : this.get('statusClassOff');
  }),

  title: computed('value', function() {
    return this.get('value') ? this.get('titleOn') : this.get('titleOff');
  }),

  _onClick: on('click', function() {
    this.onChange(!this.get('value'));
  })

});
