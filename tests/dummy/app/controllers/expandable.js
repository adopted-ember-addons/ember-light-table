import Ember from 'ember';
import TableController from './table';

const {
    computed
} = Ember;

export default TableController.extend({
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
