import stampit from 'stampit';
import { always } from 'ramda';
import { ObjectElement } from 'apidom';

import { appendMetadata } from '../../../metadata';

import MapVisitor from '../../generics/MapVisitor';
import FallbackVisitor from '../../FallbackVisitor';

const VariablesVisitor = stampit(MapVisitor, FallbackVisitor, {
  props: {
    specPath: always(['document', 'objects', 'ServerVariable']),
  },
  init() {
    this.element = new ObjectElement();
  },
  methods: {
    object(objectElement: ObjectElement) {
      // @ts-ignore
      const result = MapVisitor.compose.methods.object.call(this, objectElement);

      appendMetadata(['variables'], this.element);

      return result;
    },
  },
});

export default VariablesVisitor;
