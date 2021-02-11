import stampit from 'stampit';

import FallbackVisitor from '../FallbackVisitor';

// TODO(vladimir.gorej@gmail.com): this needs to be implemented as specific editor
// TODO(vladimir.gorej@gmail.com): currently it's only generically encoding any value to ApiDOM
const ContentVisitor = stampit(FallbackVisitor);

export default ContentVisitor;
