import stampit from 'stampit';

import HttpMethodVisitor from './HttpMethodVisitor';

const HeadVisitor = stampit(HttpMethodVisitor, {
  props: {
    httpMethod: 'HEAD',
  },
});

export default HeadVisitor;
