var EventEmitter = function() {
    this._events = {};
    this._maxListeners = 10;
};

EventEmitter.prototype = {

    on: function(event, fn) {
        this.emit('newListener', event, fn);
        this._events[event] = this._events[event] || [];
        this._events[event].push(fn);
        return this;
    },

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

    once: function(event, fn) {
        var self = this;
        self.on(event, function proxy() {
            self.removeListener(event, proxy);
            fn.apply(this, arguments);
        });
    },

    setMaxListeners: function(n) {
        this._maxListeners = n || 0;
        return this;
    },

    removeAllListeners: function(event) {
        if(event) {
            delete this._events[event];
        } else {
            this._events = {};
        }
        return this;
    },

    listeners : function (event) {
        return (this._events[event] || []).slice();
    },

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

EventEmitter.listenerCount = function(emitter, event) {
    return emitter.listeners(event).length;

};

// export
if (typeof module !== 'undefined' && ('exports' in module)) {
    module.exports = EventEmitter;
}