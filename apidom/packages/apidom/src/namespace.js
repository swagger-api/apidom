const minim = require('minim');

const ParseResult = require('./elements/ParseResult');
const Annotation = require('./elements/Annotation');
const SourceMap = require('./elements/SourceMap');

class Namespace extends minim.Namespace {
    constructor() {
        super();

        this.register('parseResult', ParseResult);
        this.register('annotation', Annotation);
        this.register('sourceMap', SourceMap);
    }
}


const namespace = new Namespace();


module.exports = namespace;
module.exports.Namespace = Namespace;
