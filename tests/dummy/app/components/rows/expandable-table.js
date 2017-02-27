// BEGIN-SNIPPET expandable-table
import Ember from 'ember';
import TableCommon from '../../mixins/table-common';

const {
  computed
} = Ember;

export default Ember.Component.extend(TableCommon, {
  columns: computed(function() {
    return [{
      label: 'First Name',
      valuePath: 'firstName'
    }, {
      label: 'Last Name',
      valuePath: 'lastName'
    }];
  })
});
// END-SNIPPET
