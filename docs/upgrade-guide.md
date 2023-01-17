## Upgrading to V3

1. BREAKING: `ember-light-table` components no longer support positional parameters, use named parameters instead.

1. BREAKING: A custom icon component is now required for sorting icons

    In prior versions, the lt-head `iconComponent` parameter was optional if Font Awesome icons were used. Font Awesome and the ember-fontawesome addon no longer provide the class based icons used in ember-light-table. 

    If the host app uses the default Font Awesome icons duplicate the `fa-wrapper-component` used in the dummy app. The `sort`, `sort-down`, and `sort-up` Font Awesome icons are imported with the addon. <sup>1</sup>

    ```hbs
    <!-- fa-icon-wrapper.hbs -->
    <FaIcon @icon={{get @sortIcons @sortIconProperty}}/>
    ```

    ```hbs
    <!-- table componnent -->
    <LightTable @table={{this.table}} as |t|>
      <t.head
        @iconSortable="sort"
        @iconAscending="sort-up"
        @iconDescending="sort-down"
        @iconComponent="fa-icon-wrapper"
      />

      <!-- remaing template... -->

    </LightTable>
    ```
    The `iconSortable`, `iconAscending` and `iconDescending` properties are now the icon names used by the icon component, not class names.
    
    To use other Font Awesome icons add the appropiate icon pacakge (i.e. @fortawesome/free-solid-svg-icons) to your devDependencies. Depending on the icon paccage, the `FaIcon` component may need the `prefix` parameter. See `ember-fontawesome` [dcoumentation](https://www.npmjs.com/package/@fortawesome/ember-fontawesome#template).

    If the comsuming app does not use the `ember-font-awesonme` addon, it can be removed from `package.json`.
    
    <sup>1</sup> Icons are tree-shaken to minimize the package size

1. The `ember-composable-helpers` dependency has been removed

    See issue [#524](https://github.com/adopted-ember-addons/ember-light-table/issues/524). This is a breaking change if your host app depends on composable helpers and `ember-composable-helpers` is not defined in your devDependencies.

    If the host app `package.json` has a yarn resolution or npm override for `ember-composable-helpers` to resolve the `'attemped to overwrite the built-in helper array'` [error](https://github.com/adopted-ember-addons/ember-light-table/issues/731), it can be removed.

1. `ember-responsive` is now an addon dependency
    
    If the host app is not using `ember-repsonsive` functionality, it can be removed from `package.json`.



1. Mixins for common table functions (i.e. scrollToBottom, data loading, etc) should be converted to components. 

    OLD: 

    ```js
    // table-common mixin
    import Mixin from '@ember/object/mixin';
    import Table from 'ember-light-table';
    import { inject as service } from '@ember/service';

    export default Mixin.create({
      store: service(),

      page: 0,
      limit: 10,
      dir: 'asc',
      sort: 'firstName',
      ...
    })
    ```

    NEW:

    ```js
    // base table component
    import Component from '@glimmer/component';
    import Table from 'ember-light-table';
    import { inject as service } from '@ember/service';
    import { tracked } from '@glimmer/tracking';

    export default class BaseTable extends Component {
      @service store;

      @tracked page = 0;
      @tracked limit = 10;
      @tracked dir = 'asc';
      @tracked sort = 'firstName';
      ...
    }
    ```
    The `BaseTable` component in the dummy application shows a complete example.

<br>

## Upgrading to v2

1. The API for initializing new tables, rows and columns has changed.

    ```js
    // old methods
    new Table(columns, rows)
    new Row(content, options) 
    new Column(opts)
    ```

    ```js
    // new methods
    Table.create(columns: columns, rows: rows)
    Row.create({ content: content })
    Column.create(opts)
    ```
    Positional arguments are also no longer supported. See [this pull request](https://github.com/adopted-ember-addons/ember-light-table/pull/701) for more information.
