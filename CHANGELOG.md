Changelog
=========

## UNRELEASED 2.X

#### :boom: Breaking Change
* [#701](https://github.com/offirgolan/ember-light-table/pull/701) Convert ES6 native classes to ember objects ([@fran-worley](https://github.com/fran-worley))
* [#713](https://github.com/offirgolan/ember-light-table/pull/713) Set minimum supported ember version at 3.4 ([@fran-worley](https://github.com/fran-worley))
* [#698](https://github.com/offirgolan/ember-light-table/pull/698) Drop support for Node 6 as end of life 30 April 2019 ([@fran-worley](https://github.com/fran-worley))

#### Bug Fixes
* [#701](https://github.com/offirgolan/ember-light-table/pull/701) Convert ES6 native classes to ember objects ([@fran-worley](https://github.com/fran-worley))
* [#693](https://github.com/offirgolan/ember-light-table/pull/693) Update ember-in-viewport, ember-wormhole ([@fran-worley](https://github.com/fran-worley))
* [#692](https://github.com/offirgolan/ember-light-table/pull/692) Replace propertyWillChange/propertyDidChange with notifyPropertyChange ([@mmadsen2](https://github.com/mmadsen2))
* [#681](https://github.com/offirgolan/ember-light-table/pull/681) use `assign` instead of `merge` ([@bekzod](https://github.com/bekzod))
* [#664](https://github.com/offirgolan/ember-light-table/pull/664) Fixing issue with multiple tables and onScrolledToBottom. ([@gmurphey](https://github.com/gmurphey))
* [#666](https://github.com/offirgolan/ember-light-table/pull/666) Pinning ip-regex to fix build issue. ([@gmurphey](https://github.com/gmurphey))
* [#596](https://github.com/offirgolan/ember-light-table/pull/596) [Draggable Column] Error when dragging column; "removeObject is not a function" ([@msenevir](https://github.com/msenevir))

#### Internal
* [#716](https://github.com/offirgolan/ember-light-table/pull/716) Bump to ember cli 3.12 and update dependencies ([@fran-worley](https://github.com/fran-worley))
* [#697](https://github.com/offirgolan/ember-light-table/pull/697) Migrate from ember-cli-changelog to lerna-changelog ([@fran-worley](https://github.com/fran-worley))
* [#696](https://github.com/offirgolan/ember-light-table/pull/696) Bump Ember CLI to 3.8 and update other dependencies ([@fran-worley](https://github.com/fran-worley))
* [#693](https://github.com/offirgolan/ember-light-table/pull/693) Update ember-in-viewport, ember-wormhole ([@fran-worley](https://github.com/fran-worley))

#### Committers: 5
- mmadsen2 [@mmadsen2](https://github.com/mmadsen2)
- bek ([@bekzod](https://github.com/bekzod))
- Garrett Murphey ([@gmurphey](https://github.com/gmurphey))
- Mahen Seneviratne ([@msenevir](https://github.com/msenevir))
- Fran Worley ([@fran-worley](https://github.com/fran-worley))

## v2.0.0-beta.3 (2019-05-9)

#### Breaking
- [#657](https://github.com/offirgolan/ember-light-table/pull/657) Officially drop support for node 4 ([@Gaurav0](https://github.com/Gaurav0))

#### Enhancements
* [#601](https://github.com/offirgolan/ember-light-table/pull/601) Avoid breaking line with sort icon in narrow columns ([@Goras](https://github.com/Gorzas))
* [#648](https://github.com/offirgolan/ember-light-table/pull/648) Expose shouldRecycle property of vertical-collection ([@Gaurav0](https://github.com/Gaurav0))

#### Bug Fixes
* [#672](https://github.com/offirgolan/ember-light-table/pull/672) bump vertical-collection to v1.0.0-beta.13 ([@fran-worley](https://github.com/fran-worley))
* [#686](https://github.com/offirgolan/ember-light-table/pull/686) refactor: Remove sendAction() calls ([@MichalBryxi](https://github.com/MichalBryxi))
* [#673](https://github.com/offirgolan/ember-light-table/pull/673) Replace merge with assign ([@fran-worley](https://github.com/fran-worley))
* [#677](https://github.com/offirgolan/ember-light-table/pull/677) ensure ember-scrollable updates when rows are updated ([@fran-worley](https://github.com/fran-worley))

#### Internal
* [#598](https://github.com/offirgolan/ember-light-table/pull/598) Stop using nativeDomClick which is deprecated. ([@plcarmel](https://github.com/plcarmel))
* [#649](https://github.com/offirgolan/ember-light-table/pull/649) Write integration tests for occlusion rendering ([@Gaurav0](https://github.com/Gaurav0))
* [#651](https://github.com/offirgolan/ember-light-table/pull/651) Update ember-cli-changelog ([@Gaurav0](https://github.com/Gaurav0))
* [#653](https://github.com/offirgolan/ember-light-table/pull/653) Fix scroll to bottom test ([@Gaurav0](https://github.com/Gaurav0))
* [#655](https://github.com/offirgolan/ember-light-table/pull/655) Update ember-scrollable ([@Gaurav0](https://github.com/Gaurav0))
* [#656](https://github.com/offirgolan/ember-light-table/pull/656) Assert and Test compatibility with LTS 3.4 ([@Gaurav0](https://github.com/Gaurav0))

#### Committers: 4
- Pierre-Luc Carmel Biron ([@plcarmel](https://github.com/plcarmel))
- Gaurav Munjal ([@Gaurav0](https://github.com/Gaurav0))
- Fran Worley ([@fran-worley](https://github.com/fran-worley))
- Michal Bryxi ([@MichalBryxi](https://github.com/MichalBryxi))

## v2.0.0-beta.2 (2018-10-29)

#### Enhancements
*[#593](https://github.com/offirgolan/ember-light-table/pull/593) Remove jQuery usage ((@donaldwasserman)[https://github.com/donaldwasserman])

#### Committers: 1
- Donald Wasserman ((@donaldwasserman)[https://github.com/donaldwasserman])

## v2.0.0-beta.1 (2018-10-26)

#### Bug Fixes
*[#590](https://github.com/offirgolan/ember-light-table/pull/590) replace `sendAction` with modern callable methods ((@donaldwasserman)[https://github.com/donaldwasserman])

#### Committers: 1
- Donald Wasserman ((@donaldwasserman)[https://github.com/donaldwasserman])

## v2.0.0-beta.0 (2018-10-25)

#### Enhancements
* [#584](https://github.com/offirgolan/ember-light-table/pull/584) Improve cells performance ([@mostafa-sakhiri](https://github.com/mostafa-sakhiri))

#### Bug Fixes
* [#586](https://github.com/offirgolan/ember-light-table/pull/586) Incomplete use of htmlSafe() on Cell.style. ([@richard-viney](https://github.com/richard-viney))

#### Committers: 2
- mostafa-sakhiri ([@mostafa-sakhiri](https://github.com/mostafa-sakhiri))
- Richard Viney ([@richard-viney](https://github.com/richard-viney))

## UNRELEASED MASTER

#### Enhancements
* [#584](https://github.com/offirgolan/ember-light-table/pull/584) Improve cells performance ([@mostafa-sakhiri](https://github.com/mostafa-sakhiri))
* [#601](https://github.com/offirgolan/ember-light-table/pull/601) Avoid breaking line with sort icon in narrow columns ([@Goras](https://github.com/Gorzas))
* [#648](https://github.com/offirgolan/ember-light-table/pull/648) Expose shouldRecycle property of vertical-collection ([@Gaurav0](https://github.com/Gaurav0))

#### Bug Fixes
* [#692](https://github.com/offirgolan/ember-light-table/pull/692) Replace propertyWillChange/propertyDidChange with notifyPropertyChange ([@mmadsen2](https://github.com/mmadsen2))
* [#681](https://github.com/offirgolan/ember-light-table/pull/681) use `assign` instead of `merge` ([@bekzod](https://github.com/bekzod))
* [#664](https://github.com/offirgolan/ember-light-table/pull/664) Fixing issue with multiple tables and onScrolledToBottom. ([@gmurphey](https://github.com/gmurphey))
* [#666](https://github.com/offirgolan/ember-light-table/pull/666) Pinning ip-regex to fix build issue. ([@gmurphey](https://github.com/gmurphey))
* [#596](https://github.com/offirgolan/ember-light-table/pull/596) [Draggable Column] Error when dragging column; "removeObject is not a function" ([@msenevir](https://github.com/msenevir))
* [#586](https://github.com/offirgolan/ember-light-table/pull/586) Incomplete use of htmlSafe() on Cell.style. ([@richard-viney](https://github.com/richard-viney))

#### Internal
* [#598](https://github.com/offirgolan/ember-light-table/pull/598) Stop using nativeDomClick which is deprecated. ([@plcarmel](https://github.com/plcarmel))
- [#649](https://github.com/offirgolan/ember-light-table/pull/649) Write integration tests for occlusion rendering ([@Gaurav0](https://github.com/Gaurav0))
- [#653](https://github.com/offirgolan/ember-light-table/pull/653) Fix scroll to bottom test ([@Gaurav0](https://github.com/Gaurav0))
- [#651](https://github.com/offirgolan/ember-light-table/pull/651) Update ember-cli-changelog ([@Gaurav0](https://github.com/Gaurav0))

#### Committers: 8
- Garrett Murphey ([@gmurphey](https://github.com/gmurphey))
- Mahen Seneviratne ([@msenevir](https://github.com/msenevir))
- mmadsen2 [@mmadsen2](https://github.com/mmadsen2)
- bek ([@bekzod](https://github.com/bekzod))
- José David Cano Pérez ([@Goras](https://github.com/Gorzas))
- Gaurav Munjal ([@Gaurav0](https://github.com/Gaurav0))
- mostafa-sakhiri ([@mostafa-sakhiri](https://github.com/mostafa-sakhiri))
- Richard Viney ([@richard-viney](https://github.com/richard-viney))
- Pierre-Luc Carmel Biron ([@plcarmel](https://github.com/plcarmel))

## v1.13.2 (2018-08-26)

#### Bug Fixes
- [e345fec](https://github.com/offirgolan/ember-light-table/commit/e345fec67916fc18ced40cd161dbf38de934e894) Use isArray to check columns, rows type ([@quaertym](https://github.com/quaertym))

#### Internal
- [7b50190](https://github.com/offirgolan/ember-light-table/commit/7b5019003b01ad4bb646d1f142ab63059bf4efd4) Update other dependencies ([@alexander-alvarez](https://github.com/alexander-alvarez))
- [715d94b](https://github.com/offirgolan/ember-light-table/commit/715d94b47cd5cbe31af99db8d6faf8aa7c00f124) Update Ember scrollable ([@Gaurav0](https://github.com/Gaurav0))

#### Committers: 3
- Emre Unal ([@quaertym](https://github.com/quaertym)
- Alex Alvarez ([@alexander-alvarez](https://github.com/alexander-alvarez))
- Gaurav Munjal ([@Gaurav0](https://github.com/Gaurav0))

## v1.13.1 (2018-06-22)

#### Internal
- [ace7f4c](https://github.com/offirgolan/ember-light-table/commit/ace7f4cc3535853fb07c406d5e3a06467d6a7f0d) Update ember-cli to 3.1.4 ([@jrjohnson](https://github.com/jrjohnson))
- [bf6edb8](https://github.com/offirgolan/ember-light-table/commit/bf6edb83fdc7fa195c786b7b1aa1826edde4518a) Update all dependencies ([@jrjohnson](https://github.com/jrjohnson))

#### Committers: 1
- Jonathan Johnson ([@jrjohnson](https://github.com/jrjohnson))

## v1.13.0 (2018-06-21)

#### Commits

- [5dccab6a](https://github.com/offirgolan/ember-light-table/commit/5dccab6a47644eef0381b30004802aa88958f176) **test(light-table/onScrolledToBottom)**: skip *by [Jan Buschtöns](https://github.com/buschtoens)*
- [a3af0b48](https://github.com/offirgolan/ember-light-table/commit/a3af0b483e1bdf354031832faf72acbf1cbbdb31) **test(lt-body/scaffolding)**: use querySelectorAll for subquery *by [Jan Buschtöns](https://github.com/buschtoens)*
- [07972532](https://github.com/offirgolan/ember-light-table/commit/079725321d7a540c58e970815a757fe4298f4cd2) **fix(lt-infinity)**: disable intersection observer *by [Jan Buschtöns](https://github.com/buschtoens)*
- [59054009](https://github.com/offirgolan/ember-light-table/commit/59054009cce1eed818926eb34c1447a4fd0cdd82) **fix(classes/{Column,Row})**: assign properties in the Ember init hook *by [Jan Buschtöns](https://github.com/buschtoens)*
- [2cc88bac](https://github.com/offirgolan/ember-light-table/commit/2cc88bacf8389ff59b2680205f9bff50fd0ab15c) **fix(lt-infinity)**: set default scroll buffer to 0 *by [Jan Buschtöns](https://github.com/buschtoens)*
- [35c89933](https://github.com/offirgolan/ember-light-table/commit/35c8993315aba2730c3cbeaa6b3e3b3a2ad445f0) **refactor(mixins/table-header)**: set sharedOptions.fixed(Header|Footer) once in init *by [Jan Buschtöns](https://github.com/buschtoens)*
- [5a4fd499](https://github.com/offirgolan/ember-light-table/commit/5a4fd499195884235cde9924715ad59c0f74ffea) **docs(README)**: fix Ember.js versions badge *by [Jan Buschtöns](https://github.com/buschtoens)*
- [fa9e50b8](https://github.com/offirgolan/ember-light-table/commit/fa9e50b89ff00f652d77177e254326f1fce496e4) **docs(README)**: add logo *by [Jan Buschtöns](https://github.com/buschtoens)*
- [0d99b0f4](https://github.com/offirgolan/ember-light-table/commit/0d99b0f4655d6a02d0ee1d3c1801db822922269d) **fix(Table)**: constructor asserts param types (#522) *by [Redmond Tran](https://github.com/RedTn)*
- [f5b56c97](https://github.com/offirgolan/ember-light-table/commit/f5b56c9710d6947e66f396ff511a67d57a1edf95) **fix(draggable-column)**: guard against undefined sourceColumn (#521) *by [Craig MacKenzie](https://github.com/cmackenz)*

## v1.12.2

#### Commits

- [6d71609d](https://github.com/offirgolan/ember-light-table/commit/6d71609da875453ff9792f636b88c5c2e7e7f385) **fix(occlusion)**: wire up lastVisibleChanged *by [Jan Buschtöns](https://github.com/buschtoens)*

## v1.12.1

This patch release primarily re-enabled dynamic column sizing for occlusion tables and wires up the `onScrolledToBottom` and `onScroll` actions.
However, we have to (temporarily) remove expanded rows. See [this comment in #514]( https://github.com/offirgolan/ember-light-table/pull/514#issuecomment-346613745) for more details.

#### Commits

- [55f5962e](https://github.com/offirgolan/ember-light-table/commit/55f5962e934b2c003e29812bc9ec76be18bbce7e) **fix(occlusion)**: remove colspan from loader and no-data spanned rows *by [Jan Buschtöns](https://github.com/buschtoens)*
- [5f6637e3](https://github.com/offirgolan/ember-light-table/commit/5f6637e33445b0b73cc572f902661d5c98559757) **fix(occlusion)**: temporarily remove yield inside vertical-collection *by [Jan Buschtöns](https://github.com/buschtoens)*
- [ee30bb83](https://github.com/offirgolan/ember-light-table/commit/ee30bb83ddad3f7e4c62dba60f1f33605f494199) **fix(occlusion)**: wire up onScroll and onScrolledToBottom *by [Jan Buschtöns](https://github.com/buschtoens)*
- [b93f0671](https://github.com/offirgolan/ember-light-table/commit/b93f0671ad635bf4024aaab1f7773db52df45cc7) **fix(occlusion)**: pass bufferSize based on scrollBuffer *by [Jan Buschtöns](https://github.com/buschtoens)*
- [c240a23c](https://github.com/offirgolan/ember-light-table/commit/c240a23c837d750c41511f93c190976e1d40d588) **fix(occlusion)**: tbody sizing via flexbox, dynamic column widths *by [Jan Buschtöns](https://github.com/buschtoens)*
- [140ea0d6](https://github.com/offirgolan/ember-light-table/commit/140ea0d60058136de6ad632aaf8b38b2c292b1c7) **docs(README)**: update "help wanted" label link *by [Jan Buschtöns](https://github.com/buschtoens)*

## v1.12.0

#### Commits

- [7feb748c](https://github.com/offirgolan/ember-light-table/commit/7feb748c670f31975156de2abca59958266daddf) **feat(lt-body)**: Preliminary Vertical collection integration (#483) *by [Alex Alvarez](https://github.com/alexander-alvarez)*

## v1.11.0

#### Commits

- [e16af170](https://github.com/offirgolan/ember-light-table/commit/e16af170a67492d4644ff113836706f0595387cc) **feat(table-header)**: custom icon components (#489) *by [RedTn](https://github.com/RedTn)*
- [daa657ee](https://github.com/offirgolan/ember-light-table/commit/daa657eea93414bbe2f9c34dfb99cd741a0d30f3) **fix(draggable-column)**: ensure the drop target remains properly identified (#496) *by [akshay-kr](https://github.com/akshay-kr)*
- [2e2faf93](https://github.com/offirgolan/ember-light-table/commit/2e2faf93a0d7979fa8e74de85c0eea18addc9564) **fix(draggable-column)**: ensure the drop target remains properly identified (#418) *by [RustyToms](https://github.com/RustyToms)*

## v1.10.0

### Pull Requests

- [#445](https://github.com/offirgolan/ember-light-table/pull/445) **readme**: add link to #e-light-table Slack channel  *by [Jan Buschtöns](https://github.com/buschtoens)*
- [#449](https://github.com/offirgolan/ember-light-table/pull/449) **head & foot**: make `table.height` optional, warn in `table-header` mixin  *by [Jan Buschtöns](https://github.com/buschtoens)*
- [#451](https://github.com/offirgolan/ember-light-table/pull/451) **table**: add `setRowsSynced` method  *by [Jan Buschtöns](https://github.com/buschtoens)*
- [#457](https://github.com/offirgolan/ember-light-table/pull/457) **light-table**: add `extra` property  *by [Jan Buschtöns](https://github.com/buschtoens)*
- [#464](https://github.com/offirgolan/ember-light-table/pull/464) **light-table**: add `iconSortable` property  *by [Vince Eberle](https://github.com/ignatius-j)*
- [#473](https://github.com/offirgolan/ember-light-table/pull/473) **refactor**: migrate to RFC 176 style ES6 module imports  *by [Robert Wagner](https://github.com/rwwagner90)*
- [#462](https://github.com/offirgolan/ember-light-table/pull/462) **ci/travis**: use headless Chrome  *by [Jan Buschtöns](https://github.com/buschtoens)*
- [#466](https://github.com/offirgolan/ember-light-table/pull/466) **ci**: align Chrome headless usage with ember-cli 2.15  *by [Jan Buschtöns](https://github.com/buschtoens)*

#### Commits

- [a60647ab](https://github.com/offirgolan/ember-light-table/commit/a60647abb87904e031afc90d5a083a5496da53fa) **test(light-table)**: add case for `extra` and `tableActions` *by [Jan Buschtöns](https://github.com/buschtoens)*

## v1.9.0

### Pull Requests

- [#390](https://github.com/offirgolan/ember-light-table/pull/390)  Move ember-truth-helpers to dependencies  *by [fsmanuel/chore](https://github.com/fsmanuel/chore)*
- [#422](https://github.com/offirgolan/ember-light-table/pull/422)  Fix missing 'as body' on example code  *by [Ahmad Suhendri](https://github.com/ahmadsoe)*
- [#438](https://github.com/offirgolan/ember-light-table/pull/438)  Modernize ELT, kill bower and enable yarn  *by [Jan Buschtöns](https://github.com/buschtoens)*
- [#440](https://github.com/offirgolan/ember-light-table/pull/440) **tests/table**: isEmpty & isEmpty (enableSync = true)  *by [Jan Buschtöns](https://github.com/buschtoens)*
- [#441](https://github.com/offirgolan/ember-light-table/pull/441) **readme**: add more information on collaborating  *by [Jan Buschtöns](https://github.com/buschtoens)*
- [#439](https://github.com/offirgolan/ember-light-table/pull/439)  Polyfill support for __proto__ in IE <= 10  *by [Jan Buschtöns](https://github.com/buschtoens)*
- [#421](https://github.com/offirgolan/ember-light-table/pull/421) **lt-body**: add enableScaffolding option  *by [Jan Buschtöns](https://github.com/buschtoens)*
- [#445](https://github.com/offirgolan/ember-light-table/pull/445) **readme**: add link to #e-light-table Slack channel  *by [Jan Buschtöns](https://github.com/buschtoens)*
- [#449](https://github.com/offirgolan/ember-light-table/pull/449) **head & foot**: make `table.height` optional, warn in `table-header` mixin  *by [Jan Buschtöns](https://github.com/buschtoens)*
- [#451](https://github.com/offirgolan/ember-light-table/pull/451) **table**: add `setRowsSynced` method  *by [Jan Buschtöns](https://github.com/buschtoens)*

#### Commits

- [b0db5b15](https://github.com/offirgolan/ember-light-table/commit/b0db5b15d96e1b7bfd8f96a3001bfac6338ec0b3) **update ember-scrollable version (#408)**: //github.com/offirgolan/ember-light-table/issues/396 *by [Rusty Toms](https://github.com/RustyToms)*

## v1.8.6

### Pull Requests

- [#385](https://github.com/offirgolan/ember-light-table/pull/385)  Fixes 'onScroll' deprecation  *by [Alex Alvarez](https://github.com/alexander-alvarez)*
- [#386](https://github.com/offirgolan/ember-light-table/pull/386)  Move ember-cli-string-helpers to dependencies  *by [Jonathan Steele](https://github.com/ynnoj)*

## v1.8.5

### Pull Requests

- [#383](https://github.com/offirgolan/ember-light-table/pull/383)  Fix for ember-composable-helpers addon incompatibility  *by [Nicholas McClay](https://github.com/nmcclay)*

## v1.8.4

### Pull Requests

- [#348](https://github.com/offirgolan/ember-light-table/pull/348)  Update Column.js to support parent  *by [Alex Alvarez](https://github.com/alexander-alvarez)*

## v1.8.3

### Pull Requests

- [#322](https://github.com/offirgolan/ember-light-table/pull/322)  Fix typo for default colspan  *by [Ilya Radchenko](https://github.com/knownasilya)*
- [#318](https://github.com/offirgolan/ember-light-table/pull/318)  Change <span> to <i> tag for sorting icons  *by [Julie Graceffa](https://github.com/jewls618)*
- [#332](https://github.com/offirgolan/ember-light-table/pull/332)  Bump ember-scrollable  *by [Offir Golan](https://github.com/offirgolan)*

#### Commits

- [70320d05](https://github.com/offirgolan/ember-light-table/commit/70320d05a99021e35d5c0878dccf6499ce88216c) **fix(package)**: update ember-get-config to version 0.2.1 *by [greenkeeper[bot]](https://github.com/greenkeeper[bot])*

## v1.8.2

### Pull Requests

- [#321](https://github.com/offirgolan/ember-light-table/pull/321)  Update ember-scrollable to the latest version 🚀  *by [Offir Golan](https://github.com/offirgolan/greenkeeper)*

#### Commits

- [e2438a50](https://github.com/offirgolan/ember-light-table/commit/e2438a508e890ee7ccce7a02fde9654c047ebee8) **fix(package)**: update ember-scrollable to version 0.4.0 *by [greenkeeper[bot]](https://github.com/greenkeeper[bot])*

## v1.8.1

### Pull Requests
- [#303](https://github.com/offirgolan/ember-light-table/pull/303)  Remove deprecated Ember.K  *by [cibernox](https://github.com/cibernox)*
- [#308](https://github.com/offirgolan/ember-light-table/pull/308)  Update ember-in-viewport to the latest version 🚀  *by [Offir Golan](https://github.com/offirgolan/greenkeeper)*

## v1.8.0

### Pull Requests

- [#290](https://github.com/offirgolan/ember-light-table/pull/290)  [FEATURE] Add selectOnClick option  *by [Offir Golan](https://github.com/offirgolan)*

## v1.7.1

### Pull Requests

- [#286](https://github.com/offirgolan/ember-light-table/pull/286)  [BUGFIX] In viewport left/right tolerance adjustment  *by [Offir Golan](https://github.com/offirgolan)*

## v1.7.0

### Pull Requests

- [#222](https://github.com/offirgolan/ember-light-table/pull/222)  [FEATURE] Support horizontal scrolling  *by [Offir Golan](https://github.com/offirgolan)*
- [#281](https://github.com/offirgolan/ember-light-table/pull/281)  [BUGFIX] Resolve IE drag and drop crashes  *by [Offir Golan](https://github.com/offirgolan)*

## v1.6.1

### Pull Requests

- [#266](https://github.com/offirgolan/ember-light-table/pull/266)  [BUGFIX] Require ember-scrollable@^0.3.5  *by [Jan Buschtöns](https://github.com/buschtoens)*

## v1.6.0

### Pull Requests

- [#252](https://github.com/offirgolan/ember-light-table/pull/252)  [BUGFIX] Resizable column improvements  *by [Offir Golan](https://github.com/offirgolan)*
- [#254](https://github.com/offirgolan/ember-light-table/pull/254)  [BUGFIX] repeated scrollToRow  *by [Jan Buschtöns](https://github.com/buschtoens)*
- [#258](https://github.com/offirgolan/ember-light-table/pull/258)  [FEATURE] Draggable Columns  *by [Offir Golan](https://github.com/offirgolan)*

## v1.5.2

### Pull Requests

- [#244](https://github.com/offirgolan/ember-light-table/pull/244)  [FEATURE] minResizeWidth + Event bubbling fix  *by [Offir Golan](https://github.com/offirgolan)*

## v1.5.1

### Pull Requests

- [#241](https://github.com/offirgolan/ember-light-table/pull/241)  [BUGFIX] Add safe checks to scroll logic  *by [Offir Golan](https://github.com/offirgolan)*

## v1.5.0

### Pull Requests

- [#221](https://github.com/offirgolan/ember-light-table/pull/221)  [FEATURE] Add label to base column to be used in column types  *by [Offir Golan](https://github.com/offirgolan)*
- [#228](https://github.com/offirgolan/ember-light-table/pull/228)  [FEATURE] ScrollTo and ScrollToRow  *by [Jan Buschtöns](https://github.com/buschtoens)*
- [#235](https://github.com/offirgolan/ember-light-table/pull/235)  [FEATURE] Responsive Columns  *by [Offir Golan](https://github.com/offirgolan)*

## v1.4.4

### Pull Requests

- [#220](https://github.com/offirgolan/ember-light-table/pull/220)  [BUGFIX] CPs using filterBy should also be dependent on the array size  *by [Offir Golan](https://github.com/offirgolan)*

## v1.4.3

### Pull Requests

- [#214](https://github.com/offirgolan/ember-light-table/pull/214)  [BUGFIX] enableSync sorting duplicates records  *by [Offir Golan](https://github.com/offirgolan)*

## v1.4.2

### Pull Requests

- [#211](https://github.com/offirgolan/ember-light-table/pull/211)  Upgrade dependencies to support Ember 2.9.0  *by [Offir Golan](https://github.com/offirgolan)*

## v1.4.1

### Pull Requests

- [#204](https://github.com/offirgolan/ember-light-table/pull/204)  Update ember-scrollable  *by [Taras Mankovski](https://github.com/taras)*

## v1.4.0

### Pull Requests

- [#167](https://github.com/offirgolan/ember-light-table/pull/167)  [FEATURE] Two-way sync between rows and model  *by [Offir Golan](https://github.com/offirgolan)*
- [#177](https://github.com/offirgolan/ember-light-table/pull/177)  [FEATURE] Customizable components  *by [Taras Mankovski](https://github.com/taras)*
- [#183](https://github.com/offirgolan/ember-light-table/pull/183)  [BUGFIX] Add footer scaffolding and move width into style attr  *by [Offir Golan](https://github.com/offirgolan)*

## v1.3.1

### Pull Requests

- [#166](https://github.com/offirgolan/ember-light-table/pull/166)  [FEATURE] Introduce `resizeOnDrag` for column resizing  *by [Offir Golan](https://github.com/offirgolan)*

## v1.3.0

### Pull Requests

- [#164](https://github.com/offirgolan/ember-light-table/pull/164)  [FEATURE] Rename flattenedColumns to allColumns  *by [Offir Golan](https://github.com/offirgolan)*

## v1.2.0

### Pull Requests

- [#160](https://github.com/offirgolan/ember-light-table/pull/160)  [FEATURE] `multiSelectRequiresKeyboard` option for toggling row selection without ctrl/cmd  *by [Jeremy Bargar](https://github.com/bargar)*
- [#163](https://github.com/offirgolan/ember-light-table/pull/163)  [BUGFIX] Autoprefix addon.css (until PostCSS is up and running) + install ember-cli-autoprefixer to prefix demo page CSS  *by [Offir Golan](https://github.com/offirgolan)*
- [#163](https://github.com/offirgolan/ember-light-table/pull/163)  [BUGFIX] Pass table instance + rawValue to custom cell component  *by [Offir Golan](https://github.com/offirgolan)*
- [#163](https://github.com/offirgolan/ember-light-table/pull/163)  [BUGFIX] Use style instead of deprecated width attribute  *by [Offir Golan](https://github.com/offirgolan)*
- [#163](https://github.com/offirgolan/ember-light-table/pull/163)  [BUGFIX] Remove readOnly from value in base cell so it can be modified  *by [Offir Golan](https://github.com/offirgolan)*
- [#163](https://github.com/offirgolan/ember-light-table/pull/163)  [BUGFIX] Column resizer now applies width to table rows on `mouseUp` instead of on `mouseMove`  *by [Offir Golan](https://github.com/offirgolan)*

## v1.1.1

### Pull Requests

- [#133](https://github.com/offirgolan/ember-light-table/pull/133)  [BUGFIX] onScrolledToBottom doesnt get re-triggered after removing table rows  *by [Offir Golan](https://github.com/offirgolan)*

## v1.1.0

### Pull Requests

- [#98](https://github.com/offirgolan/ember-light-table/pull/98)  [FEATURE] Resizable Columns  *by [Offir Golan](https://github.com/offirgolan)*
- [#115](https://github.com/offirgolan/ember-light-table/pull/115)  [FEATURE] Style Table Element  *by [Offir Golan](https://github.com/offirgolan)*
- [#117](https://github.com/offirgolan/ember-light-table/pull/117)  [BUGFIX] onScrolledToBottom doesnt get re-triggered when there arent enough rows in the table  *by [Offir Golan](https://github.com/offirgolan)*
- [#122](https://github.com/offirgolan/ember-light-table/pull/122)  [BUGFIX] Remove deprecations  *by [Offir Golan](https://github.com/offirgolan)*

#### Commits

- [8b80d645](https://github.com/offirgolan/ember-light-table/commit/8b80d645c59efbb37d2b92e9e839ec2bbcd29ae2) **make text unselectable if column is sortable** *by [Ben Limmer](https://github.com/blimmer)*

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
