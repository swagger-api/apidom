import { T as stubTrue } from 'ramda';

import { isJSONReferenceLikeElement } from '../../predicates.ts';
import AlternatingVisitor, { AlternatingVisitorOptions } from '../generics/AlternatingVisitor.ts';

export type { AlternatingVisitorOptions as SchemaOrReferenceVisitorOptions };

class SchemaOrReferenceVisitor extends AlternatingVisitor {
  constructor(options: AlternatingVisitorOptions) {
    super(options);
    this.alternator = [
      { predicate: isJSONReferenceLikeElement, specPath: ['document', 'objects', 'JSONReference'] },
      { predicate: stubTrue, specPath: ['document', 'objects', 'JSONSchema'] },
    ];
  }
}

export default SchemaOrReferenceVisitor;
