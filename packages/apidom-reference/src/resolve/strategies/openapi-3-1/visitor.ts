import stampit from 'stampit';

import OpenApi3_1DereferenceVisitor from '../../../dereference/strategies/openapi-3-1/visitor';

// eslint-disable-next-line @typescript-eslint/naming-convention
const OpenApi3_1ResolveVisitor = stampit(OpenApi3_1DereferenceVisitor);

export default OpenApi3_1ResolveVisitor;
