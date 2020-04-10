'use strict';

const stampit = require('stampit');

const SourceMap = require('../sourcemap');
const InfoOverlay = require('./info');


const OpenApi3Overlay = stampit().init(function OpenApi3({ json }) {
    const apiDOM = {
        openapi: {
            value: json.openapi,
            latest: false,
        },
        info: {
            value: InfoOverlay({ ...json.info }).toApiDOM(),
            sourceMap: SourceMap({ lineNumber: 2, byteRange: [1, 40] }),
        }
    }

    this.getOpenApi = function getOpenApi() {
        return openapi;
    }

    this.getInfo = function getInfo() {
        return info;
    }

    this.toJSON = function toJSON() {
        return {
            openapi: openapi,
            info: info ? info.toJSON(): undefined,
        }
    }

    this.toApiDOM = function toApiDOM() {
        return apiDOM;
    }
});

module.exports = OpenApi3Overlay;