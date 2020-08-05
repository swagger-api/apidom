import stampit from 'stampit';

interface ParseResult {
  type: 'parseResult';
  errors: unknown[];
  annotations: unknown[];
  rootNode: unknown;
}

const ParseResult: stampit.Stamp<ParseResult> = stampit({
  props: {
    type: 'parseResult',
    errors: [],
    annotations: [],
    rootNode: null,
  },
  init({ rootNode = null, errors = [], annotations = [] } = {}) {
    this.rootNode = rootNode;
    this.errors = errors;
    this.annotations = annotations;
  },
});

export default ParseResult;
