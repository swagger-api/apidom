import stampit from 'stampit';

import HttpMethodVisitor from './HttpMethodVisitor';

const OptionsVisitor = stampit(HttpMethodVisitor, {
  props: {
    httpMethod: 'OPTIONS',
  },
});

export default OptionsVisitor;
