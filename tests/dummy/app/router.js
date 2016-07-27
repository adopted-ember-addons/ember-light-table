import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('grouped');
  this.route('expandable');
  this.route('selectable');
  this.route('resizable');
  this.route('draggable');
});

export default Router;
