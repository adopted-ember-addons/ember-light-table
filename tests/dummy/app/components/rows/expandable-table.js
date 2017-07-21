// BEGIN-SNIPPET expandable-table
import Ember from 'ember';
import TableCommon from '../../mixins/table-common';

const { Component, computed } = Ember;

export default Component.extend(TableCommon, {
  columns: computed(function() {
    return [
      {
        label: 'First Name',
        valuePath: 'firstName'
      },
      {
        label: 'Last Name',
        valuePath: 'lastName'
      }
    ];
  })
});
// END-SNIPPET
