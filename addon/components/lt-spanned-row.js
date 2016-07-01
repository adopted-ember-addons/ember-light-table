import Ember from 'ember';
import layout from 'ember-light-table/templates/components/lt-spanned-row';

const { Component } = Ember;

export default Component.extend({
  layout,
  colspan: 1,
  tagName: '',
  visible: true
});
