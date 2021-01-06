import { Namespace as MinimNamespace } from 'minim';

import ParseResult from './elements/ParseResult';
import Annotation from './elements/Annotation';
import SourceMap from './elements/SourceMap';
import Comment from './elements/Comment';

export class Namespace extends MinimNamespace {
  constructor() {
    super();

    this.register('parseResult', ParseResult);
    this.register('annotation', Annotation);
    this.register('sourceMap', SourceMap);
    this.register('comment', Comment);
  }
}

const namespace = new Namespace();

export default namespace;
