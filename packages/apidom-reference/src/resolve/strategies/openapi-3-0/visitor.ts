import stampit from 'stampit';

import OpenApi3_0DereferenceVisitor from '../../../dereference/strategies/openapi-3-0/visitor';

// eslint-disable-next-line @typescript-eslint/naming-convention
const OpenApi3_0ResolveVisitor = stampit(OpenApi3_0DereferenceVisitor);

export default OpenApi3_0ResolveVisitor;
