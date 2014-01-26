define(function(){
    /**
     * Store the different event listener
     */
    var _eventMap = {};

    // Use to generate the uniq id of the event
    var _counter = 0;


    /**
     * Create a uniq id for each event subscriber
     * @param {String} eventName Name of the event to listen to
     * @return {String} uniq ID
     * @private
     */
    function _generateID( eventName ){
        _counter++;
        return eventName+'@#@'+_counter;
    }

    /**
     * Find the name of the event from the ID
     * @param {string} eventID
     * @return {String}
     * @private
     */
    function _extractEventName( eventID){
        return eventID.substr(0, eventID.indexOf('@#@') );
    }

    return {
        /**
         * Publish an event
         *
         * @param {String} eventName Name of the event to fire
         * @param {Object} [para] Parameters to send with the event, send to the callback
         */
        publish: function( eventName, para ){
            if( _eventMap[eventName] === undefined ){
                return;
            }

            var param = para || {};

            for( var evID in _eventMap[eventName] ){
                var subscriber = _eventMap[eventName][evID];
                if( subscriber ){
                    subscriber.callback.call( subscriber.scope, param );
                }
            }
        },

        /**
         * Listen to an event and call the callback when it is done.
         * Order of callback call is not garantuee
         *
         * "PUBLIC" event ( aka for views ) are available in lib/constant.js
         * "PRIVATE" event should be used only by system modules
         *
         * @param {String} eventName Name of the event to listen
         * @param {Function} callback Callback function to call when event occur
         * @return {String} event identifier that should be used to unsubscribe
         */
        subscribe: function( eventName, callback, scope ){
            if( !eventName ){
                throw 'Attempted to subscribe to undefined event';
            }

            callback = typeof callback == 'function' ? callback : function(){};
            scope = typeof scope == 'object' ? scope : window;

            var eventID = _generateID(eventName);

            if( _eventMap[eventName] === undefined ){
                _eventMap[eventName] = {};
            }

            _eventMap[eventName][eventID] = {
                'callback': callback,
                'scope': scope
            };

            return eventID;
        },

        /**
         * Remove a subscriber
         *
         * @param {String} bindID The id of the element to delete
         */
        unsubscribe: function( bindID ){
            var arrIDs = typeof bindID == 'array' ? bindID : [bindID];
            for( var i = arrIDs.length; i--;){
                var id = arrIDs[i];
                var eventName = _extractEventName( id );
                if( _eventMap[ eventName ][ id ] ){
                    delete _eventMap[ eventName ][ id ];
                }
            }
        }
    };
});
