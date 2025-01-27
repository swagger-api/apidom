import {
  OneOfVisitor as OneOfJSONSchema202012Options,
  OneOfVisitorOptions,
} from '@swagger-api/apidom-ns-json-schema-2020-12';

export type { OneOfVisitorOptions };

/**
 * @public
 */
class AnyOfVisitor extends OneOfJSONSchema202012Options {
  constructor(options: OneOfVisitorOptions) {
    super(options);
    this.passingOptionsNames.push('parent');
  }
}

export default AnyOfVisitor;
