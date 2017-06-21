import Ember from 'ember';
import layout from '../templates/components/code-panel';

const { Component } = Ember;

export default Component.extend({
  layout,
  collapse: true,
  title: '',
  snippets: null
});
