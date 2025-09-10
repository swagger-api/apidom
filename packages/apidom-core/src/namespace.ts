import { Namespace as MinimNamespace, NamespacePlugin } from 'minim';
import { isPlainObject } from 'ramda-adjunct';

import AnnotationElement from './elements/Annotation.ts';
import CommentElement from './elements/Comment.ts';
import ParseResultElement from './elements/ParseResult.ts';

/**
 * @public
 */
export class Namespace extends MinimNamespace {
  constructor() {
    super();

    this.register('annotation', AnnotationElement);
    this.register('comment', CommentElement);
    this.register('parseResult', ParseResultElement);
  }
}

/**
 * @public
 */
const namespace = new Namespace();

/**
 * @public
 */
export const createNamespace = (namespacePlugin?: NamespacePlugin): Namespace => {
  const namespaceInstance = new Namespace();

  if (isPlainObject(namespacePlugin)) {
    namespaceInstance.use(namespacePlugin);
  }

  return namespaceInstance;
};

export default namespace;
