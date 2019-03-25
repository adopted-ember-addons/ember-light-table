import EmberRouter from '@ember/routing/router';
import config from './config/environment';

// eslint-disable-next-line ember-suave/no-direct-property-access
const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('responsive');
  this.route('scrolling');

  this.route('columns', function() {
    this.route('draggable');
    this.route('grouped');
    this.route('resizable');
  });

  this.route('rows', function() {
    this.route('expandable');
    this.route('selectable');
    this.route('spreadsheet');
  });

  this.route('cookbook', function() {
    this.route('client-side');
    this.route('custom-row');
    this.route('custom-sort-icon');
    this.route('horizontal-scrolling');
    this.route('occlusion-rendering');
    this.route('pagination');
    this.route('table-actions');
  });
});

export default Router;
