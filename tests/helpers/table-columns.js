export default [
  {
    label: 'Avatar',
    valuePath: 'avatar',
    width: '60px',
    sortable: false,
    cellComponent: 'user-avatar'
  },
  {
    label: 'First Name',
    valuePath: 'firstName',
    width: '150px'
  },
  {
    label: 'Last Name',
    valuePath: 'lastName',
    width: '150px'
  },
  {
    label: 'Address',
    valuePath: 'address'
  },
  {
    label: 'State',
    valuePath: 'state'
  },
  {
    label: 'Country',
    valuePath: 'country'
  }
];

export const GroupedColumns = [
  {
    label: 'User Details',
    sortable: false,
    align: 'center',
    subColumns: [
      {
        label: 'Avatar',
        valuePath: 'avatar',
        width: '60px',
        sortable: false,
        cellComponent: 'user-avatar'
      },
      {
        label: 'First',
        valuePath: 'firstName',
        width: '150px'
      },
      {
        label: 'Last',
        valuePath: 'lastName',
        width: '150px'
      }
    ]
  },
  {
    label: 'Contact Information',
    sortable: false,
    align: 'center',
    subColumns: [
      {
        label: 'Address',
        valuePath: 'address'
      },
      {
        label: 'State',
        valuePath: 'state'
      },
      {
        label: 'Country',
        valuePath: 'country'
      }
    ]
  }
];
