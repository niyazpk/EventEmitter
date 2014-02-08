EventEmitter
============

A light-weight version of Node EventEmitter. Works in both browser and node environments!

API Docs - http://nodejs.org/api/events.html#events_events

### Usage

In addition to the APIs Node-EventEmitter supports, we have a mixin support which will make any object (DOM elements etc) emit events:

    var emitter = EventEmitter.mixin(anyObject);

### Tests

Running the tests is as easy as:

1. Clone this repo
2. Install Grunt: `npm install -g grunt-cli`
3. Run `npm install` at the root of the repo.
3. Run `grunt test` at the root of the repo.

This will run the tests in browser (phantomjs) as well as in node.

If you find any bugs/issues please [file an issue](https://github.com/niyazpk/EventEmitter/issues/new).
If you want to contribute to this library, please feel free to fork it and/or send pull requests.

