# Ember Light Table

[![Ember Version](https://embadge.io/v1/badge.svg?start=2.3.0)](https://embadge.io/v1/badge.svg?start=2.3.0)
[![Build Status](https://travis-ci.org/offirgolan/ember-light-table.svg)](https://travis-ci.org/offirgolan/ember-light-table)
[![npm version](https://badge.fury.io/js/ember-light-table.svg)](http://badge.fury.io/js/ember-light-table)
[![Code Climate](https://codeclimate.com/github/offirgolan/ember-light-table/badges/gpa.svg)](https://codeclimate.com/github/offirgolan/ember-light-table)
[![Test Coverage](https://codeclimate.com/github/offirgolan/ember-light-table/badges/coverage.svg)](https://codeclimate.com/github/offirgolan/ember-light-table/coverage)
[![Dependency Status](https://david-dm.org/offirgolan/ember-light-table.svg)](https://david-dm.org/offirgolan/ember-light-table)
[![devDependency Status](https://david-dm.org/offirgolan/ember-light-table/dev-status.svg)](https://david-dm.org/offirgolan/ember-light-table#info=devDependencies)

A lightweight contextual component based table addon that follows Ember's actions up, data down ideology.

## Features

- Custom component based column headers and cells
- Infinite scroll support
- Select & Multi-select
- Fixed header and footer
- Grouped columns
- Expandable rows
- Easy table manipulation
- Easy override to table header and footer
- Contextual component for header, body, and footer, as well as loading, no data, and expanded row

## Installation
```shell
ember install ember-light-table
```

## Helpful Links

- ### [Live Demo](http://offirgolan.github.io/ember-light-table)

- ### [Documentation](http://offirgolan.github.io/ember-light-table/docs)

- ### [Changelog](CHANGELOG.md)

## Looking for help?
If it is a bug [please open an issue on GitHub](http://github.com/offirgolan/ember-light-table/issues).

## Usage
There are two parts to this addon. The first is the [Table](http://offirgolan.github.io/ember-light-table/docs/classes/Table.html) which you create with column definitions and rows, and the second is the component declaration.

### Table Declaration
The `Table` constructor accepts an array of `Columns` or column options and an array of rows.

```javascript
import Table from 'ember-light-table';
const table = new Table(columns, rows);
```

Here is a more real-word example

```javascript
// components/my-table.js
import Ember from 'ember';
import Table from 'ember-light-table';

const computed = Ember.computed;

export default Ember.Component.extend({
  model: null,
  table: null,

  columns: computed(function() {
    return [{
      label: 'Avatar',
      valuePath: 'avatar',
      width: '60px',
      sortable: false,
      cellComponent: 'user-avatar'
    }, {
      label: 'First Name',
      valuePath: 'firstName',
      width: '150px'
    }, {
      label: 'Last Name',
      valuePath: 'lastName',
      width: '150px'
    }, {
      label: 'Address',
      valuePath: 'address'
    }, {
      label: 'State',
      valuePath: 'state'
    }, {
      label: 'Country',
      valuePath: 'country'
    }];
  }),

  init() {
    this._super(...arguments);
    this.set('table', new Table(this.get('columns'), this.get('model')));
  }
});
```

For a list of possible column options, please [checkout out the docs](http://offirgolan.github.io/ember-light-table/docs/classes/Column.html).

### Component Declaration

Now that we have our `table`, we can declare our component in our template.

```hbs
{{#light-table table as |t|}}
  {{t.head}}

  {{#t.body as |body|}}
    {{#body.expanded-row as |row|}}
      Hello <b>{{row.firstName}}</b>
    {{/body.expanded-row}}

    {{#if isLoading}}
      {{#body.loader}}
        Loading...
      {{/body.loader}}
    {{/if}}

    {{#if table.isEmpty}}
      {{#body.no-data}}
        No users found.
      {{/body.no-data}}
    {{/if}}
  {{/t.body}}

  {{t.foot}}
{{/light-table}}
```

Please note that each of these contextual components have a wide array of options so it is advised to look through the documentation.  
