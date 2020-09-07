import stampit from 'stampit';

import HttpMethodVisitor from './HttpMethodVisitor';

const PutVisitor = stampit(HttpMethodVisitor, {
  props: {
    httpMethod: 'PUT',
  },
});

export default PutVisitor;
