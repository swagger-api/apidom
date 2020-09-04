import stampit from 'stampit';
import { appendMetadata } from '../../../metadata';
import JsonStringVisitor from '../../generics/JsonStringVisitor';

const VersionVisitor = stampit(JsonStringVisitor, {
  methods: {
    string(stringNode) {
      // @ts-ignore
      const result = JsonStringVisitor.compose.methods.string.call(this, stringNode);

      appendMetadata(['version'], this.element);

      return result;
    },
  },
});

export default VersionVisitor;
