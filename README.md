<div align="center">
  <a href="https://offirgolan.github.io/ember-light-table/">
    <img
      src="https://rawgit.com/offirgolan/ember-light-table/master/docs/readme-logo.png"
      alt="Ember Light Table"
    >
  </a>
</div>

[![Ember Version](https://embadge.io/v1/badge.svg?start=2.3.0)](https://embadge.io/v1/badge.svg?start=2.3.0)
[![Build Status](https://travis-ci.org/offirgolan/ember-light-table.svg)](https://travis-ci.org/offirgolan/ember-light-table)
[![npm version](https://badge.fury.io/js/ember-light-table.svg)](http://badge.fury.io/js/ember-light-table)
[![Download Total](https://img.shields.io/npm/dt/ember-light-table.svg)](http://badge.fury.io/js/ember-light-table)
[![Ember Observer Score](https://emberobserver.com/badges/ember-light-table.svg)](https://emberobserver.com/addons/ember-light-table)
[![Code Climate](https://codeclimate.com/github/offirgolan/ember-light-table/badges/gpa.svg)](https://codeclimate.com/github/offirgolan/ember-light-table)

**Ember Light Table** is a  lightweight contextual component based table addon that follows Ember's actions up, data down ideology.

## Features

- Custom component based column headers and cells
- Infinite scroll support
- Select & Multi-select with keyboard support (CMD/CTRL, SHIFT)
- Fixed header and footer
- Grouped columns
- Resizable columns
- Expandable rows
- Responsive
- Scroll Tracking
- Easy table manipulation
- Easy override to table header, body, and footer
- Contextual component for header, body, and footer, as well as loading, no data, and expanded row
- **EXPERIMENTAL** Occlusion rendering leveraging [vertical-collection](https://github.com/html-next/vertical-collection). See [Demo](http://offirgolan.github.io/ember-light-table/#/cookbook/occlusion-rendering).

## Installation

```shell
ember install ember-light-table
```

## :link: Helpful Links

- :rocket: [Live Demo][demo]
- :books: [API Documentation][docs]
- :pencil: [Changelog](CHANGELOG.md)

## :sos: Looking for Help?

- :warning: **Bug reports**: If your bug hasn't been reported yet, please [**open an issue**][new-issue]. Try to pick a short but descriptive title. Make sure you're using the latest version of *ember-light-table*. In the issue body, try to provide exact steps for reproduction, ideally with example code. If you can't, please include any and all error messages, as many details as possible and exact information on which Ember.js / ember-cli version and browser / OS you're using.
- :question: **Questions**: As with bugs, please make sure the question wasn't asked before. Also, see if the [Live Demo][demo], [Cookbook][cookbook] or [API docs][docs] already cover your problem. If not, please do [**open an issue**][new-issue].
- ![Slack Icon](https://i.imgur.com/Bjckhpc.png) **Slack**: We're happy to help you in our [**#e-light-table**][slack] Slack channel! You can [create an Ember Community Slack account][slackin] here for free.

## :metal: Getting Involved

We're glad you love *ember-light-table* just as much as we do! If you want to help us making it even better, we would be delighted to have you on board, even if you've just started using Ember.

### :bulb: Submitting Ideas

If you've got a great idea in store, but don't feel up for the task to implement it yourself, just [**open an issue**][new-issue]. That way you can put your thoughts out there for discussion and we can evolve it further.

We'll see, whether this feature is a good fit for *ember-light-table* itself or could better be implemented in a third-party addon.

You're also always invited to chime in on ongoing issues, *especially* for issues marked with [**ideas-wanted**][ideas-wanted].

### :keyboard: Contributing Code

Contributing to an Ember addon is a great opportunity to get in touch with advanced concepts. You're also getting free peer review for your code as a bonus!

And most importantly, you're doing something good for the community!

#### :sparkles: New Features

If you want to make a bigger change, we recommend [**opening an issue**][new-issue] first, so we can agree on the best possible implementation first and none of your work goes to waste.

#### :eyes: Don't know where to start?

You don't have a specific feature in mind but want to help out anyways? Awesome!

Issues marked with [**help wanted**][help-wanted] are generally agreed upon and ready to get implemented. Oftentimes we have clearly outlined how these issues should get resolved.

We try hard to accurately estimate the overall difficulty and scope of issues and organize them with labels:

- :relaxed: [**difficulty-easy**][difficulty-easy]: Perfect for beginners or if you don't have much time on your hands.
- :wink: [**difficulty-medium**][difficulty-medium]: A fair knowledge of *ember-light-table* and Ember.js / ember-cli is recommended. The higher level plan or expected API has been clearly outlined. The implementation details should be pretty easy to figure out.
- :thinking: [**difficulty-hard**][difficulty-hard]: For the experienced. Implementation details are important to get right as to not wreak havoc or kill performance. Still the overall plan should be clearly outlined.
- :scream: [**difficulty-epic**][difficulty-epic]: Up for a challenge, eh? Either this issue has a really broad scope, requires substantial refactoring and rewrites or we know what we want to achieve, but are not quite sure how.

#### :handshake: Got Stuck?

We're here to help! It's a good idea to submit you're pull request (PR) right away. Just prefix the title with `[WIP]` (work in progress) so we know that you're not done yet.

This way, you can get feedback early on or ask others for help. Your commits are also automatically tested by Travis CI. :robot:

Pull requests marked with [**ideas-wanted**][pr-ideas-wanted] are stuck and we would like to hear your thought.

If a pull request is marked with [**help wanted**][pr-help-wanted] we just don't have the time and resources to work on it right now. You're invited to continue working on it instead!

[new-issue]: https://github.com/offirgolan/ember-light-table/issues/new

[ideas-wanted]: https://github.com/offirgolan/ember-light-table/issues?q=is%3Aissue+is%3Aopen+label%3Aideas-wanted
[help-wanted]: https://github.com/offirgolan/ember-light-table/issues?q=is%3Aissue+is%3Aopen+label%3A%22help+wanted%22

[pr-ideas-wanted]: https://github.com/offirgolan/ember-light-table/pulls?q=is%3Apr+is%3Aopen+label%ideas-wanted
[pr-help-wanted]: https://github.com/offirgolan/ember-light-table/pulls?q=is%3Apr+is%3Aopen+label%3Ahelp+wanted

[difficulty-easy]: https://github.com/offirgolan/ember-light-table/issues?q=is%3Aissue+is%3Aopen+label%3Adifficulty-easy
[difficulty-medium]: https://github.com/offirgolan/ember-light-table/issues?q=is%3Aissue+is%3Aopen+label%3Adifficulty-medium
[difficulty-hard]: https://github.com/offirgolan/ember-light-table/issues?q=is%3Aissue+is%3Aopen+label%3Adifficulty-hard
[difficulty-epic]: https://github.com/offirgolan/ember-light-table/issues?q=is%3Aissue+is%3Aopen+label%3Adifficulty-epic

[demo]: https://offirgolan.github.io/ember-light-table/
[cookbook]: https://offirgolan.github.io/ember-light-table/#/cookbook
[docs]: https://offirgolan.github.io/ember-light-table/docs/

[slack]: https://embercommunity.slack.com/messages/C615THVGF
[slackin]: https://ember-community-slackin.herokuapp.com/
