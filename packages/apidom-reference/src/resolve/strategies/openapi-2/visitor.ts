import stampit from 'stampit';

import OpenApi2DereferenceVisitor from '../../../dereference/strategies/openapi-2/visitor';

const OpenApi2ResolveVisitor = stampit(OpenApi2DereferenceVisitor);

export default OpenApi2ResolveVisitor;
