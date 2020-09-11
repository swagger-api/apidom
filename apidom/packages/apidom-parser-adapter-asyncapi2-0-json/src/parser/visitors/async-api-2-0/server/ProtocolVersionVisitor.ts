import stampit from 'stampit';
import JsonStringVisitor from '../../generics/JsonStringVisitor';

const ProtocolVersionVisitor = stampit(JsonStringVisitor);

export default ProtocolVersionVisitor;
