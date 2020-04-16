const minim = require('minim');

const ParseResult = require('./elements/ParseResult');
const Annotation = require('./elements/Annotation');

class Namespace extends minim.Namespace {
    constructor() {
        super();

        this.register('parseResult', ParseResult);
        this.register('annotation', Annotation);
    }
}


const namespace = new Namespace();


module.exports = namespace;
module.exports.Namespace = Namespace;
