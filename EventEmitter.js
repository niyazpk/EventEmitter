var EventEmitter = function() {};

EventEmitter.prototype = {

    on: function(event, fn) {
        this._events = this._events || {};
        this.emit('newListener', event, fn);
        this._events[event] = this._events[event] || [];
        this._events[event].push(fn);
        return this;
    },

    off: function(event, fn) {
        this._events = this._events || {};
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

    removeAllListeners: function(event) {
        this._events = this._events || {};
        if(event) {
            delete this._events[event];
        } else {
            this._events = {};
        }
        return this;
    },

    listeners : function (event) {
        this._events = this._events || {};
        return (this._events[event] || []).slice();
    },

    emit: function(event /* , args */ ) {
        
        this._events = this._events || {};
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
