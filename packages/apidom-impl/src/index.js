'use strict';

const fs = require('fs');

const Info = require('./stamps/oas3.0/info');
const OpenApi3 = require('./stamps/oas3.0/overlay/open-api3');
const InfoOverlay = require('./stamps/oas3.0/overlay/info');
const Overlay = require('./stamps/overlay');

const oas3 = JSON.parse(fs.readFileSync('../openapi.json').toString());
const openApi3 = OpenApi3({ json: oas3 });

console.dir(Overlay.of(openApi3));
