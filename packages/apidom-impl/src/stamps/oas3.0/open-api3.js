'use strict';

const stampit = require('stampit');

const OpenApi3 = stampit().init(function OpenApi3({ openapi = '3.0.0', info }) {
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
});

module.exports = OpenApi3;