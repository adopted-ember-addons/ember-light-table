import Ember from 'ember';
import config from './config/environment';

// eslint-disable-next-line ember-suave/no-direct-property-access
const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('responsive');
  this.route('scrolling');

  this.route('columns', function() {
    this.route('grouped');
    this.route('resizable');
    this.route('draggable');
  });

  this.route('rows', function() {
    this.route('expandable');
    this.route('selectable');
  });

  this.route('cookbook', function() {
    this.route('client-side');
    this.route('pagination');
    this.route('custom-row');
    this.route('table-actions');
    this.route('horizontal-scrolling');
  });
});

export default Router;
