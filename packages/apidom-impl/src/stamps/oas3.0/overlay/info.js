'use strict';

const stampit = require('stampit');

const SourceMap = require('../sourcemap');
const Info = require('../info');

const InfoOverlay = stampit().init(function InfoOverlay({ json }) {
    const info = Info({ ...json });
    const apiDOM = {
        title: {
            value: info.getTitle(),
            sourceMap: SourceMap({ lineNumber: 1, byteRange: [1, 30] }),
            length: 24,
        },
        description: {
            value: info.getDescription(),
            sourceMap: SourceMap({ lineNumber: 2, byteRange: [1, 40] }),
            length: 26,
        },
        version: {
            value: info.getVersion(),
        },
    }

    this.getTitle = function getTitle() {
        return info.getTitle();
    }

    this.getDescription = function getDescription() {
        return info.getDescription();
    }

    this.getVersion = function getVersion() {
        return info.getVersion();
    }

    this.toJSON = function toJSON() {
        return info.toJSON();
    }

    this.toApiDOM = function toApiDOM() {
        return apiDOM;
    }
})

module.exports = InfoOverlay;