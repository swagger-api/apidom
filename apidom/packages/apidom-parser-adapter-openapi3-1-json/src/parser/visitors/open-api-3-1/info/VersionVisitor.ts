import stampit from 'stampit';
import PropertyVisitor from '../../generics/property-visitor';
import { appendMetadata } from '../../../metadata';

const VersionVisitor = stampit(PropertyVisitor, {
  props: {
    name: 'version',
    type: 'String',
  },
  methods: {
    property(propertyNode) {
      // @ts-ignore
      const result = PropertyVisitor.compose.methods.property.call(this, propertyNode);
      const { value: versionElement } = this.element;

      appendMetadata(['version'], versionElement);

      return result;
    },
  },
});

export default VersionVisitor;
