'use strict';

const fs = require('fs');
const path = require('path');
const apiElements = require('api-elements');

const namespace = new apiElements.Namespace();


const instagramRefractFile = path.join(__dirname, '..', 'fixtures', 'api-elements', 'tripletex.json');
const instagramRefract = JSON.parse(fs.readFileSync(instagramRefractFile).toString());

const memoryBefore = process.memoryUsage().heapUsed / 1024 / 1024;
const minimInst = namespace.serialiser.deserialise(instagramRefract);
console.dir(minimInst.element);
const memoryAfter = process.memoryUsage().heapUsed / 1024 / 1024;

console.dir(memoryAfter - memoryBefore);

