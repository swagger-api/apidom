import stampit from 'stampit';

import HttpMethodVisitor from './HttpMethodVisitor';

const PostVisitor = stampit(HttpMethodVisitor, {
  props: {
    httpMethod: 'POST',
  },
});

export default PostVisitor;
