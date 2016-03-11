import Table from './classes/Table';
import Column from './classes/Column';
import Row from './classes/Row';

/**
 * A lightweight contextual component based table addon that follows Ember's actions up, data down ideology.
 *
 * ## Features
 *
 * * Custom component based column headers and cells
 * * Infinite scroll support
 * * Select & Multi-select
 * * Grouped columns
 * * Expandable rows
 * * Easy table manipulation
 * * Easy override to table header and footer
 * * Contextual component for header, body, and footer, as well as loading, no data, and expanded row
 *
 * ## Installation
 * ```shell
 * ember install ember-light-table
 * ```
 *
 * ## Looking for help?
 * If it is a bug [please open an issue on GitHub](http://github.com/offirgolan/ember-light-table/issues).
 *
 * ## Usage
 * There are two parts to this addon. The first is the [Table](../classes/Table.html) which you create with column definitions and rows, and the second is the component declaration.
 *
 * ### Table Declaration
 * The `Table` constructor accepts an array of `Columns` or column options and an array of rows.
 *
 * ```javascript
 * import Table from 'ember-light-table';
 * const table = new Table(columns, rows);
 * ```
 *
 * Here is a more real-word example
 *
 * ```javascript
 * // components/my-table.js
 * import Ember from 'ember';
 * import Table from 'ember-light-table';
 *
 * const computed = Ember.computed;
 *
 * export default Ember.Component.extend({
 *   model: null,
 *   table: null,
 *
 *   columns: computed(function() {
 *     return [{
 *       label: 'Avatar',
 *       valuePath: 'avatar',
 *       width: '60px',
 *       sortable: false,
 *       cellComponent: 'user-avatar'
 *     }, {
 *       label: 'First Name',
 *       valuePath: 'firstName',
 *       width: '150px'
 *     }, {
 *       label: 'Last Name',
 *       valuePath: 'lastName',
 *       width: '150px'
 *     }, {
 *       label: 'Address',
 *       valuePath: 'address'
 *     }, {
 *       label: 'State',
 *       valuePath: 'state'
 *     }, {
 *       label: 'Country',
 *       valuePath: 'country'
 *     }];
 *   }),
 *
 *   init() {
 *     this._super(...arguments);
 *     this.set('table', new Table(this.get('columns'), this.get('model').toArray()));
 *   }
 * });
 * ```
 *
 * For a list of possible column options, please
 * [checkout out the docs](../classes/Column.html).
 *
 * ### Component Declaration
 *
 * Now that we have our `table`, we can declare our component in our template.
 *
 * ```hbs
 * {{#light-table table as |t|}}
 *   {{t.head}}
 *
 *   {{#t.body as |body|}}
 *     {{#body.expanded-row as |row|}}
 *       Hello <b>{{row.firstName}}</b>
 *     {{/body.expanded-row}}
 *
 *     {{#if isLoading}}
 *       {{#body.loader}}
 *         Loading...
 *       {{/body.loader}}
 *     {{/if}}
 *
 *     {{#if table.isEmpty)}}
 *       {{#body.no-data}}
 *         No users found.
 *       {{/body.no-data}}
 *     {{/if}}
 *   {{/t.body}}
 *
 *   {{t.foot}}
 * {{/light-table}}
 * ```
 *
 * Please note that each of these contextual components have a wide array of options so it is advised to look
 * through the documentation.
 *
 * @module Home
 */
export default Table;
export { Table, Column, Row };
