import { Namespace as MinimNamespace } from 'minim';

import AnnotationElement from './elements/Annotation';
import CommentElement from './elements/Comment';
import ParseResultElement from './elements/ParseResult';
import SourceMapElement from './elements/SourceMap';

export class Namespace extends MinimNamespace {
  constructor() {
    super();

    this.register('annotation', AnnotationElement);
    this.register('comment', CommentElement);
    this.register('parseResult', ParseResultElement);
    this.register('sourceMap', SourceMapElement);
  }
}

const namespace = new Namespace();

export default namespace;
