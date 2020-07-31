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
});

export default ParseResult;
