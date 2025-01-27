import {
  AllOfVisitor as AllOfJSONSchema202012Options,
  AllOfVisitorOptions,
} from '@swagger-api/apidom-ns-json-schema-2020-12';

export type { AllOfVisitorOptions };

/**
 * @public
 */
class AllOfVisitor extends AllOfJSONSchema202012Options {
  constructor(options: AllOfVisitorOptions) {
    super(options);
    this.passingOptionsNames.push('parent');
  }
}

export default AllOfVisitor;
