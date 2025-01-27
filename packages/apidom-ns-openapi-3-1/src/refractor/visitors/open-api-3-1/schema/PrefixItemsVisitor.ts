import {
  PrefixItemsVisitor as PrefixItemsJSONSchema202012Visitor,
  PrefixItemsVisitorOptions,
} from '@swagger-api/apidom-ns-json-schema-2020-12';

export type { PrefixItemsVisitorOptions };

/**
 * @public
 */
class PrefixItemsVisitor extends PrefixItemsJSONSchema202012Visitor {
  constructor(options: PrefixItemsVisitorOptions) {
    super(options);
    this.passingOptionsNames.push('parent');
  }
}

export default PrefixItemsVisitor;
