import stampit from 'stampit';

import { ValueVisitor } from '../generics';

// TODO(vladimir.gorej@gmail.com): this needs to be implemented as specific editor
// TODO(vladimir.gorej@gmail.com): currently it's only generically encoding any value to ApiDOM
const ExamplesVisitor = stampit(ValueVisitor);

export default ExamplesVisitor;
