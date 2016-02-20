import Table from 'ember-light-table';

const Columns = [{
    label: 'Avatar',
    valuePath: 'avatar',
    width: '60px',
    sortable: false,
    cellComponent: 'user-avatar'
}, {
    label: 'First Name',
    valuePath: 'firstName',
    width: '150px'
}, {
    label: 'Last Name',
    valuePath: 'lastName',
    width: '150px'
}, {
    label: 'Address',
    valuePath: 'address'
}, {
    label: 'State',
    valuePath: 'state'
}, {
    label: 'Country',
    valuePath: 'country'
}];

var table = new Table(Columns, []);
