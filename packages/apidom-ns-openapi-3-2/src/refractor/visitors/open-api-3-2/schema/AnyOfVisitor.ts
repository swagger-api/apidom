import {
  AnyOfVisitor as AnyOfJSONSchema202012Options,
  AnyOfVisitorOptions,
} from '@swagger-api/apidom-ns-json-schema-2020-12';

export type { AnyOfVisitorOptions };

/**
 * @public
 */
class AnyOfVisitor extends AnyOfJSONSchema202012Options {
  constructor(options: AnyOfVisitorOptions) {
    super(options);
    this.passingOptionsNames.push('parent');
  }
}

export default AnyOfVisitor;
