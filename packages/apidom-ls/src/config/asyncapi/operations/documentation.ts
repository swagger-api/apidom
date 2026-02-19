import { AsyncAPI3 } from '../target-specs.ts';

const documentation = [
  {
    docs: "#### [Operations Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#operationsObject)\n\nHolds a dictionary with all the [operations](https://www.asyncapi.com/docs/reference/specification/v3.0.0#operationObject) this application MUST implement.\n\\\n\\\nIf you're looking for a place to define operations that MAY or MAY NOT be implemented by the application, consider defining them in [components/operations](https://www.asyncapi.com/docs/reference/specification/v3.0.0#componentsOperations).\n\n##### Patterned Fields\n\nField Pattern | Type | Description\n---|:---:|---\n`{operationId}` | [Operation Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#operationObject) \\| [Reference Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#referenceObject) | The operation this application MUST implement. The field name (`operationId`) MUST be a string used to identify the operation in the document where it is defined, and its value is case-sensitive. Tools and libraries MAY use the operationId to uniquely identify an operation, therefore, it is RECOMMENDED to follow common programming naming convention.",
    targetSpecs: AsyncAPI3,
  },
];

export default documentation;
