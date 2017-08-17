YUI.add("yuidoc-meta", function(Y) {
   Y.YUIDoc = { meta: {
    "classes": [
        "Base Cell",
        "Base Column",
        "Column",
        "Row",
        "Table",
        "TableHeaderMixin",
        "fixProto",
        "light-table",
        "t.body",
        "t.foot",
        "t.head"
    ],
    "modules": [
        "Cell Types",
        "Column Types",
        "Component Declaration",
        "Light Table",
        "Table",
        "Table Declaration",
        "Usage",
        "Utils"
    ],
    "allModules": [
        {
            "displayName": "Cell Types",
            "name": "Cell Types"
        },
        {
            "displayName": "Column Types",
            "name": "Column Types"
        },
        {
            "displayName": "Component Declaration",
            "name": "Component Declaration",
            "description": "The `light-table` component exposes 3 contextual component (head, body, and foot).\n\n```hbs\n{{#light-table table as |t|}}\n\n  {{t.head}}\n\n  {{#t.body as |body|}}\n    {{#body.expanded-row as |row|}}\n      Hello <b>{{row.firstName}}</b>\n    {{/body.expanded-row}}\n\n    {{#if isLoading}}\n      {{#body.loader}}\n        Loading...\n      {{/body.loader}}\n    {{/if}}\n\n    {{#if table.isEmpty}}\n      {{#body.no-data}}\n        No users found.\n      {{/body.no-data}}\n    {{/if}}\n  {{/t.body}}\n\n  {{t.foot}}\n\n{{/light-table}}\n```\n\nEach of these contextual components have a wide array of options so it is advised to look\nthrough their documentation."
        },
        {
            "displayName": "Light Table",
            "name": "Light Table"
        },
        {
            "displayName": "Table",
            "name": "Table"
        },
        {
            "displayName": "Table Declaration",
            "name": "Table Declaration",
            "description": "## Creating a Table Instance\n\nThe first step is to create a table instance that will be used by the component to render\nthe actual table structure. This same table instance can be used add, remove, and modify\nrows and columns. See the [table class documentation](../classes/Table.html) for more details.\n\n```javascript\nimport Table from 'ember-light-table';\n\nconst table = new Table(columns, rows, options);\n```\n\nHere is a more real-word example\n\n```javascript\n// components/my-table.js\nimport { computed } from '@ember/object';\nimport Table from 'ember-light-table';\n\nexport default Ember.Component.extend({\n  model: null,\n\n  columns: computed(function() {\n    return [{\n      label: 'Avatar',\n      valuePath: 'avatar',\n      width: '60px',\n      sortable: false,\n      cellComponent: 'user-avatar'\n    }, {\n      label: 'First Name',\n      valuePath: 'firstName',\n      width: '150px'\n    }, {\n      label: 'Last Name',\n      valuePath: 'lastName',\n      width: '150px'\n    }];\n  }),\n\n  table: computed('model', function() {\n   return new Table(this.get('columns'), this.get('model'));\n  })\n});\n```\n\n## Implicit Row Creation\n\nTo enable synchronization between the table's rows and a model, the `enableSync` flag\nmust be set to __true__.\n\n```javascript\nimport Table from 'ember-light-table';\n\nconst table = new Table(columns, model, { enableSync: true });\n```\n\nThe `enableSync` options creates a __two way__ sync. This means that any manipulation\nthat occurs on the model will also take place on the table's rows collection and vice versa.\n\nTo default `enableSync` to always be true, you can add the following in your __config/environment.js__\n\n```javascript\nmodule.exports = function(environment) {\n  var ENV = {\n   // ...\n    'ember-light-table': {\n      enableSync: true\n    }\n  };\n\n  // ...\n\n  return ENV;\n};\n```"
        },
        {
            "displayName": "Usage",
            "name": "Usage",
            "description": "## Installation\n```shell\nember install ember-light-table\n```\n\n## Looking for help?\nIf it is a bug [please open an issue on GitHub](http://github.com/offirgolan/ember-light-table/issues).\n\n## Usage\nThere are two parts to this addon. The first is the [Table](../classes/Table.html) which you create with column definitions and rows, and the second is the component declaration."
        },
        {
            "displayName": "Utils",
            "name": "Utils"
        }
    ],
    "elements": []
} };
});