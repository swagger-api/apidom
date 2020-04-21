'use strict';

const fs = require('fs');
const path = require('path');
const { Fury } = require('fury');
const minim = require('minim');

const fury = new Fury();

const openAPI2Parser = require('fury-adapter-swagger');
fury.use(openAPI2Parser);

const source = fs.readFileSync(path.join(__dirname, '..', 'fixtures', 'tripletex.json')).toString();

fury.parse({source}, (error, parseResult) => {
    fs.writeFileSync(
        path.join(__dirname, '..', 'fixtures', 'tripletex-refract.json'),
        JSON.stringify(minim.namespace().toRefract(parseResult))
    );
});