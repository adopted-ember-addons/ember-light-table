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
 * If it is a bug [please open an issue on GitHub](https://github.com/adopted-ember-addons/ember-light-table/issues).
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
 * const table = Table.create({ columns: columns, rows: rows });
 * ```
 *
 * Here is a more real-word example
 *
 * ```javascript
 * // components/my-table.js
 * import Component from '@glimmer/component';
 * import Table from 'ember-light-table';
 *
 * export default class MyTable extends Component {
 *   model = null;
 *
 *  get columns() {
 *     return [
 *       {
 *         label: 'Avatar',
 *         valuePath: 'avatar',
 *         width: '60px',
 *         sortable: false,
 *         cellComponent: 'user-avatar',
 *       },
 *       {
 *        label: 'First Name',
 *         valuePath: 'firstName',
 *         width: '150px',
 *       },
 *       {
 *         label: 'Last Name',
 *         valuePath: 'lastName',
 *         width: '150px',
 *        },
 *      ];
 *   }
 *
 *   get table() {
 *     return Table.create({ columns: this.columns, rows: this.model });
 *   }
 * }
 * ```
 *
 * @module Usage
 * @submodule Table Declaration
 */

/**
 * The `light-table` component exposes 3 contextual component (head, body, and foot).
 *
 * ```hbs
 * <LightTable @table={{this.table}} as |t|>
 *
 *   <t.head />
 *
 *   {<t.body as |body|>
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
 *   <t.foot />
 *
 * </LightTable>
 * ```
 *
 * Each of these contextual components have a wide array of options so it is advised to look
 * through their documentation.
 *
 * @module Usage
 * @submodule Component Declaration
 */
export default Table;
export { Table, Column, Row };
