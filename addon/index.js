import Table from './classes/Table';
import Column from './classes/Column';
import Row from './classes/Row';

/**
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
 * @module Usage
 */

/**
 * ## Creating a Table Instance
 *
 * The first step is to create a table instance that will be used by the component to render
 * the actual table structure. This same table instance can be used add, remove, and modify
 * rows and columns. See the [table class documentation](../classes/Table.html) for more details.
 *
 * ```javascript
 * import Table from 'ember-light-table';
 *
 * const table = new Table(columns, rows, options);
 * ```
 *
 * Here is a more real-word example
 *
 * ```javascript
 * // components/my-table.js
 * import { computed } from '@ember/object';
 * import Table from 'ember-light-table';
 *
 * export default Ember.Component.extend({
 *   model: null,
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
 *     }];
 *   }),
 *
 *   table: computed('model', function() {
 *    return new Table(this.get('columns'), this.get('model'));
 *   })
 * });
 * ```
 *
 * ## Implicit Row Creation
 *
 * To enable synchronization between the table's rows and a model, the `enableSync` flag
 * must be set to __true__.
 *
 * ```javascript
 * import Table from 'ember-light-table';
 *
 * const table = new Table(columns, model, { enableSync: true });
 * ```
 *
 * The `enableSync` options creates a __two way__ sync. This means that any manipulation
 * that occurs on the model will also take place on the table's rows collection and vice versa.
 *
 * To default `enableSync` to always be true, you can add the following in your __config/environment.js__
 *
 * ```javascript
 * module.exports = function(environment) {
 *   var ENV = {
 *    // ...
 *     'ember-light-table': {
 *       enableSync: true
 *     }
 *   };
 *
 *   // ...
 *
 *   return ENV;
 * };
 * ```
 *
 * @module Usage
 * @submodule Table Declaration
 */

/**
 * The `light-table` component exposes 3 contextual component (head, body, and foot).
 *
 * ```hbs
 * {{#light-table table as |t|}}
 *
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
 *     {{#if table.isEmpty}}
 *       {{#body.no-data}}
 *         No users found.
 *       {{/body.no-data}}
 *     {{/if}}
 *   {{/t.body}}
 *
 *   {{t.foot}}
 *
 * {{/light-table}}
 * ```
 *
 * Each of these contextual components have a wide array of options so it is advised to look
 * through their documentation.
 *
 * The same component using angle bracket invocation, available in Ember 3.4+
 * ```hbs
 * <LightTable table as |t|>
 *
 *   <t.head />
 *
 *   <t.body as |body|>
 *     <body.expanded-row as |row|>
 *       Hello <b>{{row.firstName}}</b>
 *     </body.expanded-row>
 *
 *     {{#if isLoading}}
 *       <body.loader>
 *         Loading...
 *       </body.loader>
 *     {{/if}}
 *
 *     {{#if table.isEmpty}}
 *       <body.no-data>
 *         No users found.
 *       </body.no-data>
 *     {{/if}}
 *   </t.body>
 *
 *   <t.foot>
 *
 * </LightTable>
 * ```
 * @module Usage
 * @submodule Component Declaration
 */
export default Table;
export { Table, Column, Row };
