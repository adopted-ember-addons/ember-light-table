import Ember from 'ember';
import MediaService from 'ember-responsive/media';

const { K, getOwner } = Ember;
const { classify } = Ember.String;

MediaService.reopen({
  // Change this if you want a different default breakpoint in tests.
  _defaultBreakpoint: 'desktop',

  _breakpointArr: Ember.computed('breakpoints', function() {
    return Object.keys(this.get('breakpoints')) || Ember.A([]);
  }),

  _forceSetBreakpoint(breakpoint) {
    let found = false;

    let props = {};
    this.get('_breakpointArr').forEach(function(bp) {
      let val = bp === breakpoint;
      if (val) {
        found = true;
      }

      props[`is${classify(bp)}`] = val;
    });

    if (found) {
      this.setProperties(props);
    } else {
      throw new Error(
        `You tried to set the breakpoint to ${breakpoint}, which is not in your app/breakpoint.js file.`
      );
    }
  },

  match: K, // do not set up listeners in test

  init() {
    this._super(...arguments);

    this._forceSetBreakpoint(this.get('_defaultBreakpoint'));
  }
});

export default Ember.Test.registerAsyncHelper('setBreakpoint', function(app, breakpoint) {
  // this should use getOwner once that's supported
  let mediaService = app.__deprecatedInstance__.lookup('service:media');
  mediaService._forceSetBreakpoint(breakpoint);
});

export function setBreakpointForIntegrationTest(container, breakpoint) {
  let mediaService = getOwner(container).lookup('service:media');
  mediaService._forceSetBreakpoint(breakpoint);
  container.set('media', mediaService);

  return mediaService;
}
