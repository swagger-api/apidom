import stampit from 'stampit';

import HttpMethodVisitor from './HttpMethodVisitor';

const TraceVisitor = stampit(HttpMethodVisitor, {
  props: {
    httpMethod: 'TRACE',
  },
});

export default TraceVisitor;
