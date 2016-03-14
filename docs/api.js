YUI.add("yuidoc-meta", function(Y) {
   Y.YUIDoc = { meta: {
    "classes": [
        "Body",
        "Column",
        "Foot",
        "Head",
        "Light Table",
        "Row",
        "Table",
        "TableColumnMixin",
        "TableScrollMixin"
    ],
    "modules": [
        "Classes",
        "Components",
        "Home",
        "Mixins"
    ],
    "allModules": [
        {
            "displayName": "Classes",
            "name": "Classes"
        },
        {
            "displayName": "Components",
            "name": "Components",
            "description": "```hbs\n{{#light-table table as |t|}}\n  {{t.head}}\n  {{t.body}}\n  {{t.foot}}\n{{/light-table}}\n```\n\nPlease see the documentation for the [Head](../classes/Head.html), [Body](../classes/Body.html), and [Foot](../classes/Foot.html) components\nfor more details on all possible options and actions."
        },
        {
            "displayName": "Home",
            "name": "Home",
            "description": "A lightweight contextual component based table addon that follows Ember's actions up, data down ideology.\n\n## Features\n\n* Custom component based column headers and cells\n* Infinite scroll support\n* Select & Multi-select\n* Grouped columns\n* Expandable rows\n* Easy table manipulation\n* Easy override to table header and footer\n* Contextual component for header, body, and footer, as well as loading, no data, and expanded row\n\n## Installation\n```shell\nember install ember-light-table\n```\n\n## Looking for help?\nIf it is a bug [please open an issue on GitHub](http://github.com/offirgolan/ember-light-table/issues).\n\n## Usage\nThere are two parts to this addon. The first is the [Table](../classes/Table.html) which you create with column definitions and rows, and the second is the component declaration.\n\n### Table Declaration\nThe `Table` constructor accepts an array of `Columns` or column options and an array of rows.\n\n```javascript\nimport Table from 'ember-light-table';\nconst table = new Table(columns, rows);\n```\n\nHere is a more real-word example\n\n```javascript\n// components/my-table.js\nimport Ember from 'ember';\nimport Table from 'ember-light-table';\n\nconst computed = Ember.computed;\n\nexport default Ember.Component.extend({\n  model: null,\n  table: null,\n\n  columns: computed(function() {\n    return [{\n      label: 'Avatar',\n      valuePath: 'avatar',\n      width: '60px',\n      sortable: false,\n      cellComponent: 'user-avatar'\n    }, {\n      label: 'First Name',\n      valuePath: 'firstName',\n      width: '150px'\n    }, {\n      label: 'Last Name',\n      valuePath: 'lastName',\n      width: '150px'\n    }, {\n      label: 'Address',\n      valuePath: 'address'\n    }, {\n      label: 'State',\n      valuePath: 'state'\n    }, {\n      label: 'Country',\n      valuePath: 'country'\n    }];\n  }),\n\n  init() {\n    this._super(...arguments);\n    this.set('table', new Table(this.get('columns'), this.get('model')));\n  }\n});\n```\n\nFor a list of possible column options, please\n[checkout out the docs](../classes/Column.html).\n\n### Component Declaration\n\nNow that we have our `table`, we can declare our component in our template.\n\n```hbs\n{{#light-table table as |t|}}\n  {{t.head}}\n\n  {{#t.body as |body|}}\n    {{#body.expanded-row as |row|}}\n      Hello <b>{{row.firstName}}</b>\n    {{/body.expanded-row}}\n\n    {{#if isLoading}}\n      {{#body.loader}}\n        Loading...\n      {{/body.loader}}\n    {{/if}}\n\n    {{#if table.isEmpty)}}\n      {{#body.no-data}}\n        No users found.\n      {{/body.no-data}}\n    {{/if}}\n  {{/t.body}}\n\n  {{t.foot}}\n{{/light-table}}\n```\n\nPlease note that each of these contextual components have a wide array of options so it is advised to look\nthrough the documentation."
        },
        {
            "displayName": "Mixins",
            "name": "Mixins"
        }
    ],
    "elements": []
} };
});