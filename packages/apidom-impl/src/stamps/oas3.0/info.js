'use strict';

const stampit = require('stampit');

const Info = stampit().init(function Info({ title, description, version }) {
    this.getTitle = function getTitle() {
        return title;
    }

    this.getDescription = function getDescription() {
        return description;
    }

    this.getVersion = function getVersion() {
        return version;
    }

    this.toJSON = function toJSON() {
        return { title, description, version };
    }
});

module.exports = Info;