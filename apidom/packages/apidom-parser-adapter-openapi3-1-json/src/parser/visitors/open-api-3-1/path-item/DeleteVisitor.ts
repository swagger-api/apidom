import stampit from 'stampit';

import HttpMethodVisitor from './HttpMethodVisitor';

const DeleteVisitor = stampit(HttpMethodVisitor, {
  props: {
    httpMethod: 'DELETE',
  },
});

export default DeleteVisitor;
