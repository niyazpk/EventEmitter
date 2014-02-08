var isNode = typeof module !== 'undefined' && module.exports;

if (isNode) {
    EventEmitter = require('./EventEmitter');
    expect = require('chai').expect;
    sinon = require('sinon');
}


describe("EventEmitter", function() {
    var eventEmitter;
    var event_funcs;

    beforeEach(function() {
        eventEmitter = new EventEmitter();

        event_funcs = {
            foo: function() {},
            bar: function() {},
            baz: function() {},
            wat: 'not function'
        };
        sinon.spy(event_funcs, 'foo');
        sinon.spy(event_funcs, 'bar');
        sinon.spy(event_funcs, 'baz');

        sinon.spy(eventEmitter, 'on');
        sinon.spy(eventEmitter, 'off');
        sinon.spy(eventEmitter, 'emit');
        sinon.spy(eventEmitter, 'setMaxListeners');

    });

    it("binds a single function to an event", function() {
        eventEmitter.on('event_one', event_funcs.foo);
        eventEmitter.emit('event_one');

        expect(event_funcs.foo.called).to.be.true;
        expect(event_funcs.foo.callCount).to.equal(1);
    });

    it("passes arguments to a bound function", function() {
        eventEmitter.on('event_one', event_funcs.foo);
        eventEmitter.emit('event_one', 1, 2);

        expect(event_funcs.foo.calledWith(1, 2)).to.be.ok;
    });

    it("binds several functions to one event", function() {
        eventEmitter.on('event_one', event_funcs.foo);
        eventEmitter.on('event_one', event_funcs.bar);
        eventEmitter.on('event_one', event_funcs.baz);

        eventEmitter.emit('event_one');

        expect(event_funcs.foo.called).to.be.true;
        expect(event_funcs.foo.callCount).to.equal(1);

        expect(event_funcs.bar.called).to.be.true;
        expect(event_funcs.bar.callCount).to.equal(1);

        expect(event_funcs.baz.called).to.be.true;
        expect(event_funcs.baz.callCount).to.equal(1);

    });

    it("passes arguments to all functions bound to the same event", function() {
        eventEmitter.on('event_one', event_funcs.foo);
        eventEmitter.on('event_one', event_funcs.bar);
        eventEmitter.on('event_one', event_funcs.baz);

        eventEmitter.emit('event_one', 1, 2);

        expect(event_funcs.foo.calledWith(1, 2)).to.be.ok;
        expect(event_funcs.bar.calledWith(1, 2)).to.be.ok;
        expect(event_funcs.baz.calledWith(1, 2)).to.be.ok;
    });

    it("binds functions to several different events", function() {
        eventEmitter.on('event_one', event_funcs.foo);
        eventEmitter.on('event_two', event_funcs.bar);
        eventEmitter.on('event_three', event_funcs.baz);

        eventEmitter.emit('event_one');
        eventEmitter.emit('event_two');
        eventEmitter.emit('event_three');

        expect(event_funcs.foo.called).to.be.true;
        expect(event_funcs.foo.callCount).to.equal(1);

        expect(event_funcs.bar.called).to.be.true;
        expect(event_funcs.bar.callCount).to.equal(1);

        expect(event_funcs.baz.called).to.be.true;
        expect(event_funcs.baz.callCount).to.equal(1);

    });

    it("unbinds a function from an event", function() {
        eventEmitter.on('event_one', event_funcs.foo);
        eventEmitter.on('event_one', event_funcs.bar);

        eventEmitter.off('event_one', event_funcs.foo);

        eventEmitter.emit('event_one');

        expect(event_funcs.foo.called).to.be.false;

        expect(event_funcs.bar.called).to.be.true;
        expect(event_funcs.bar.callCount).to.equal(1);

    });

    it("keeps working when triggering unknown event", function() {
        eventEmitter.on('event_one', event_funcs.foo);
        eventEmitter.on('event_two', event_funcs.bar);

        eventEmitter.emit('unknown_event');

        expect(event_funcs.foo.called).to.be.false;
        expect(event_funcs.bar.called).to.be.false;

    });

    it("keeps working when unbinding unknown event", function() {
        eventEmitter.on('event_one', event_funcs.foo);
        eventEmitter.off('unknown_event', event_funcs.foo);

        eventEmitter.emit('event_one');

        expect(event_funcs.foo.called).to.be.true;

    });


    describe("Validations", function() {
        it("on: throws error if listener is not a function", function() {
            try {
                eventEmitter.on('event_one', event_funcs.wat);
            } catch (e) {}
            expect(eventEmitter.on.threw()).to.be.true;
            expect(eventEmitter.on.threw("TypeError")).to.be.true;
        });

        it("off: throws error if listener is not a function", function() {
            try {
                eventEmitter.off('event_one', event_funcs.wat);
            } catch (e) {}
            expect(eventEmitter.off.threw()).to.be.true;
            expect(eventEmitter.off.threw("TypeError")).to.be.true;
        });

        it("emit: throws error if error handler is not defined", function() {
            try {
                eventEmitter.emit('error');
            } catch (e) {}
            expect(eventEmitter.emit.threw()).to.be.true;
            expect(eventEmitter.emit.threw("Error")).to.be.true;
        });

        it("emit: throws custom error if it is passed", function() {
            try {
                eventEmitter.emit('error', new TypeError());
            } catch (e) {}
            expect(eventEmitter.emit.threw()).to.be.true;
            expect(eventEmitter.emit.threw("TypeError")).to.be.true;
        });

        it("setMaxListeners: don't throw error if n is a number", function() {
            try {
                eventEmitter.setMaxListeners(15);
            } catch (e) {}
            expect(eventEmitter.setMaxListeners.threw()).to.be.false;
            expect(eventEmitter.setMaxListeners.threw("TypeError")).to.be.false;
        });

        it("setMaxListeners: throws error if n is not a number", function() {
            try {
                eventEmitter.setMaxListeners('wat');
            } catch (e) {}
            expect(eventEmitter.setMaxListeners.threw()).to.be.true;
            expect(eventEmitter.setMaxListeners.threw("TypeError")).to.be.true;
        });
    });
});