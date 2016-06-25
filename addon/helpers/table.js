import Ember from 'ember';
import Table from '../classes/Table';

export function table([columns, data = []]) {
  return new Table(columns, data);
}

export default Ember.Helper.helper(table);
