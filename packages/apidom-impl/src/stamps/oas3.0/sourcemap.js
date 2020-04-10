'use strict';

const stampit = require('stampit');

const SourceMap = stampit({
    props: {
        lineNumber: undefined,
        byteRange: undefined,
    },
    init({ lineNumber, byteRange }) {
        this.lineNumber = lineNumber;
        this.byteRange = byteRange;
    },
    methods: {
        toJSON() {
            return {
                lineNumber: this.lineNumber,
                byteRange: this.byteRange,
            }
        },
    }
})

module.exports = SourceMap;