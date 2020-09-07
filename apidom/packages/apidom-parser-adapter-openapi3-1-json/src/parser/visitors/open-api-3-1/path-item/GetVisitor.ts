import stampit from 'stampit';

import HttpMethodVisitor from './HttpMethodVisitor';

const GetVisitor = stampit(HttpMethodVisitor, {
  props: {
    httpMethod: 'GET',
  },
});

export default GetVisitor;
