import stampit from 'stampit';

import ApiDOMDereferenceVisitor from '../../../dereference/strategies/apidom/visitor';

const ApiDOMResolveVisitor = stampit(ApiDOMDereferenceVisitor);

export default ApiDOMResolveVisitor;
