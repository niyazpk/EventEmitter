 /**
  * Class for managing events.
  * Can be extended to provide event functionality in other classes.
  *
  * @class EventEmitter Manages event registering and emitting.
  */
var EventEmitter = function() {
    this._events = {};
    this._maxListeners = 10;
};

EventEmitter.prototype = {

    /**
     * Adds a listener to the end of the listeners array for the specified event.
     *
     * @param {String} event Name of the event to attach the listener to.
     * @param {Function} listener Method to be called when the event is emitted.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    on: function(event, fn) {
        this.emit('newListener', event, fn);
        this._events[event] = this._events[event] || [];
        this._events[event].push(fn);
        return this;
    },

    /**
     * Remove a listener from the listener array for the specified event. 
     * Caution: changes array indices in the listener array behind the listener.
     *
     * @param {String} event Name of teh event to remove the listener from.
     * @param {Function} listener Method to remove from the event.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    off: function(event, fn) {
        if (event in this._events) {
            var index = this._events[event].indexOf(fn);
            if(index !== -1) {
                this._events[event].splice(index, 1);
                this.emit('removeListener', event, fn);
            }
        }
        return this;
    },


    /**
     * Adds a one time listener for the event. This listener is invoked only the
     * next time the event is fired, after which it is removed.
     *
     * @param {String} event Name of the event to attach the listener to.
     * @param {Function} listener Method to be called when the event is emitted.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    once: function(event, fn) {
        var self = this;
        self.on(event, function proxy() {
            self.removeListener(event, proxy);
            fn.apply(this, arguments);
        });
    },


    /**
     * Adds a listener that will be automatically removed after its first
     * execution.
     *
     * @param {String} event Name of the event to attach the listener to.
     * @param {Function} listener Method to be called when the event is emitted.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    setMaxListeners: function(n) {
        this._maxListeners = n || 0;
        return this;
    },

    /**
     * Removes all listeners, or those of the specified event.
     *
     * @param {String} event Name of the event to attach the listener to.
     * @param {Function} listener Method to be called when the event is emitted.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    removeAllListeners: function(event) {
        if(event) {
            delete this._events[event];
        } else {
            this._events = {};
        }
        return this;
    },

    /**
     * Returns an array of listeners for the specified event.
     *
     * @param {String} event Name of the event to emit and execute listeners for.
     * @return {Array} An array of listeners for the specified event.
     */
    listeners : function (event) {
        return (this._events[event] || []).slice();
    },

    /**
     * Execute each of the listeners in order with the supplied arguments.
     *
     * @param {String} event Name of the event to emit
     * @param {Array} [args] Optional array of arguments to be passed to each listener.
     * @return {Boolean} Returns `true` if event had listeners, false otherwise.
     */
    emit: function(event /* , args */ ) {
        
        var args     = Array.prototype.slice.call(arguments, 1);
        var handlers = this._events[event];

        var i        = handlers ? handlers.length : 0;
        if(i) {
            while(i--) {
                handlers[i].apply(this, args);
            }
            return true;
        } else {
            return false;
        }
    }
};

EventEmitter.prototype.addListener    = EventEmitter.prototype.on;
EventEmitter.prototype.removeListener = EventEmitter.prototype.off;

/**
 * Return the number of listenes for a given event.
 *
 * @param {Object} emitter The object which emits events.
 * @param {String} event The event name.
 * @return {Number} The number of listeners for the event in the given object.
 */
EventEmitter.listenerCount = function(emitter, event) {
    return emitter.listeners(event).length;

};

// export
if (typeof module !== 'undefined' && ('exports' in module)) {
    module.exports = EventEmitter;
}