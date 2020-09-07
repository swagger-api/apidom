import stampit from 'stampit';

import HttpMethodVisitor from './HttpMethodVisitor';

const PatchVisitor = stampit(HttpMethodVisitor, {
  props: {
    httpMethod: 'PATCH',
  },
});

export default PatchVisitor;
