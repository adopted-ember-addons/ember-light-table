# Change Log

## 1.0.0-beta.3
- [#25](https://github.com/offirgolan/ember-light-table/pull/25) Add support for custom row, column, and cell class names. Also add the ability to hide/show rows via `hidden` property

## 1.0.0-beta.2
- Remove ember-wormhole from blueprint by just using it as a dependency

## 1.0.0-beta.1
- [#17](https://github.com/offirgolan/ember-light-table/pull/17) Fixes to table scroll, layout restructuring fixes, and auto set scroll/touch move container if there is a fixed header or footer

## 1.0.0-beta.0
- [#16](https://github.com/offirgolan/ember-light-table/pull/16) Fixed header and footer support as well as some table layout restructuring.

## 0.1.9
- Remove tag-less cell component since it was restricting a bunch of Ember.Component features such as class name bindings, events, etc.

## 0.1.8
- [#14](https://github.com/offirgolan/ember-light-table/pull/14) Table cell performance to decrease render time by almost half

## 0.1.7
- Setup scroll event binding only if action is present
- Add is-expanded css class to row

## 0.1.6
- Rename `formatter` to `format`

## 0.1.5
- Ability to provide a formatter function to column definition that will be used to computed the cell value

## 0.1.4
- [#4](https://github.com/offirgolan/ember-light-table/pull/4) Apply width on cell component based on it's columns width [@steffenbrem](https://github.com/steffenbrem)
- [#5](https://github.com/offirgolan/ember-light-table/issues/5) Add insertRowAt & insertColumnAt to public Table API
- Return pushed/inserted rows & columns from public APIs

## 0.1.3
- Fixed an issue where cell value was not bound

## 0.1.2
- Ability to push rows using ArrayProxy instances

## 0.1.1
- [#1](https://github.com/offirgolan/ember-light-table/issues/1) Add default CSS

## 0.1.0
- Initial Release
