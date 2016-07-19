Changelog
=========

## v1.0.1

- [#101](https://github.com/offirgolan/ember-light-table/pull/101) Always use Ember object `get` by [@blimmer](https://github.com/blimmer)
- [#102](https://github.com/offirgolan/ember-light-table/pull/102) Use ember-font-awesome vs. ember-cli-font-awesome by  [@blimmer](https://github.com/blimmer)

## v1.0.0

- [#30](https://github.com/offirgolan/ember-light-table/pull/30) Support custom cell and column types
- [#38](https://github.com/offirgolan/ember-light-table/pull/38) Add table reference to custom column components
- [#40](https://github.com/offirgolan/ember-light-table/pull/40) Use native Ember trackpad scroll emulator via ember-scrollable - [@taras](https://github.com/taras)
- [#42](https://github.com/offirgolan/ember-light-table/pull/42) Add hideable option to columns

__BREAKING CHANGES__

1. `headerComponent` in column definition has been renamed to `component`
2. `onScrolledToBottom` action has been moved from `{{light-table}}` to `{{t.body}}` component
3. `height` has been moved from `{{t.body}}` to `{{light-table}}` component

## v0.1.9
- Remove tag-less cell component since it was restricting a bunch of Ember.Component features such as class name bindings, events, etc.

## v0.1.8
- [#14](https://github.com/offirgolan/ember-light-table/pull/14) Table cell performance to decrease render time by almost half

## v0.1.7
- Setup scroll event binding only if action is present
- Add is-expanded css class to row

## v0.1.6
- Rename `formatter` to `format`

## v0.1.5
- Ability to provide a formatter function to column definition that will be used to computed the cell value

## v0.1.4
- [#4](https://github.com/offirgolan/ember-light-table/pull/4) Apply width on cell component based on it's columns width [@steffenbrem](https://github.com/steffenbrem)
- [#5](https://github.com/offirgolan/ember-light-table/issues/5) Add insertRowAt & insertColumnAt to public Table API
- Return pushed/inserted rows & columns from public APIs

## v0.1.3
- Fixed an issue where cell value was not bound

## v0.1.2
- Ability to push rows using ArrayProxy instances

## v0.1.1
- [#1](https://github.com/offirgolan/ember-light-table/issues/1) Add default CSS

## v0.1.0
- Initial Release
