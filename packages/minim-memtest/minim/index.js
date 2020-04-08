'use strict';

const fs = require('fs');
const path = require('path');
const namespace = require('minim').namespace();


var instagramRefractFile = path.join(__dirname, '..', 'fixtures', 'api-elements', 'tripletex.json');
var instagramRefract = JSON.parse(fs.readFileSync(instagramRefractFile).toString());


const memoryBefore = process.memoryUsage().heapUsed / 1024 / 1024;
const minimInst = namespace.fromRefract(instagramRefract);
console.dir(minimInst.element);
const memoryAfter = process.memoryUsage().heapUsed / 1024 / 1024;

console.dir(memoryBefore);
console.dir(memoryAfter);
console.dir(memoryAfter - memoryBefore);
