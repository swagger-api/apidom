'use strict';

const stampit = require('stampit');

const Overlay = stampit({
    staticProperties: {
        of: overlayInstance => {
            return overlayInstance.hasOwnProperty('toApiDOM')
                ? overlayInstance.toApiDOM()
                : null;
        }
    }
});

module.exports = Overlay;