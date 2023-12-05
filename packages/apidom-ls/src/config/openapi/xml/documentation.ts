import { OpenAPI30, OpenAPI31, OpenAPI3 } from '../target-specs';

const documentation = [
  {
    target: 'name',
    docs: 'Replaces the name of the element/attribute used for the described schema property. When defined within `items`, it will affect the name of the individual XML elements within the list. When defined alongside `type` being `array` (outside the `items`), it will affect the wrapping element and only if `wrapped` is `true`. If `wrapped` is `false`, it will be ignored.',
    targetSpecs: OpenAPI3,
  },
  {
    target: 'namespace',
    docs: 'The URI of the namespace definition. This MUST be in the form of an absolute URI.',
    targetSpecs: OpenAPI3,
  },
  {
    target: 'prefix',
    docs: 'The prefix to be used for the [name](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#xmlName).',
    targetSpecs: OpenAPI30,
  },
  {
    target: 'prefix',
    docs: 'The prefix to be used for the [name](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#xmlName).',
    targetSpecs: OpenAPI31,
  },
  {
    target: 'attribute',
    docs: 'Declares whether the property definition translates to an attribute instead of an element. Default value is `false`.',
    targetSpecs: OpenAPI3,
  },
  {
    target: 'wrapped',
    docs: 'MAY be used only for an array definition. Signifies whether the array is wrapped (for example, `<books><book/><book/></books>`) or unwrapped (`<book/><book/>`). Default value is `false`. The definition takes effect only when defined alongside `type` being `array` (outside the `items`).',
    targetSpecs: OpenAPI3,
  },
  /**
   * The original documentation has been trimmed in this implementation for readability purposes
   * A new custom section `Additional documentation topics` has been added,
   * which adds external links back to the original documentation
   */
  {
    docs: '#### [XML Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#xmlObject)\n\nA metadata object that allows for more fine-tuned XML model definitions.\n\nWhen using arrays, XML element names are *not* inferred (for singular/plural forms) and the `name` property SHOULD be used to add that information.\nSee examples for expected behavior.\n\n##### Fixed Fields\nField Name | Type | Description\n---|:---:|---\nname | `string` | Replaces the name of the element/attribute used for the described schema property. When defined within `items`, it will affect the name of the individual XML elements within the list. When defined alongside `type` being `array` (outside the `items`), it will affect the wrapping element and only if `wrapped` is `true`. If `wrapped` is `false`, it will be ignored.\nnamespace | `string` | The URI of the namespace definition. Value MUST be in the form of an absolute URI.\nprefix | `string` | The prefix to be used for the [name](#xmlName).\nattribute | `boolean` | Declares whether the property definition translates to an attribute instead of an element. Default value is `false`.\nwrapped | `boolean` | MAY be used only for an array definition. Signifies whether the array is wrapped (for example, `<books><book/><book/></books>`) or unwrapped (`<book/><book/>`). Default value is `false`. The definition takes effect only when defined alongside `type` being `array` (outside the `items`).\n\nThis object MAY be extended with [Specification Extensions](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#specificationExtensions).\n\n#### Additional documentation topics\n\n##### [XML Object Examples](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#xml-object-examples)\nThe examples of the XML object definitions are included inside a property definition of a [Schema Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#schemaObject) with a sample of the XML representation of it.\n\n- [No XML Element](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#no-xml-element)\n- [XML Name Replacement](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#xml-name-replacement)\n- [XML Attribute, Prefix and Namespace](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#xml-attribute-prefix-and-namespace)\n- [XML Arrays](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#xml-arrays)',
    targetSpecs: [
      { namespace: 'openapi', version: '3.0.0' },
      { namespace: 'openapi', version: '3.0.1' },
      { namespace: 'openapi', version: '3.0.2' },
      { namespace: 'openapi', version: '3.0.3' },
    ],
  },
  {
    docs: '#### [XML Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#xmlObject)\n\nA metadata object that allows for more fine-tuned XML model definitions.\n\nWhen using arrays, XML element names are *not* inferred (for singular/plural forms) and the `name` property SHOULD be used to add that information.\nSee examples for expected behavior.\n\n##### Fixed Fields\nField Name | Type | Description\n---|:---:|---\nname | `string` | Replaces the name of the element/attribute used for the described schema property. When defined within `items`, it will affect the name of the individual XML elements within the list. When defined alongside `type` being `array` (outside the `items`), it will affect the wrapping element and only if `wrapped` is `true`. If `wrapped` is `false`, it will be ignored.\nnamespace | `string` | The URI of the namespace definition. This MUST be in the form of an absolute URI.\nprefix | `string` | The prefix to be used for the [name](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#xmlName).\nattribute | `boolean` | Declares whether the property definition translates to an attribute instead of an element. Default value is `false`.\nwrapped | `boolean` | MAY be used only for an array definition. Signifies whether the array is wrapped (for example, `<books><book/><book/></books>`) or unwrapped (`<book/><book/>`). Default value is `false`. The definition takes effect only when defined alongside `type` being `array` (outside the `items`).\n\nThis object MAY be extended with [Specification Extensions](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#specificationExtensions).\n\n#### Additional documentation topics\n\n##### [XML Object Examples](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#xml-object-examples)\nThe examples of the XML object definitions are included inside a property definition of a [Schema Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#schemaObject) with a sample of the XML representation of it.\n\n- [No XML Element](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#no-xml-element)\n- [XML Name Replacement](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#xml-name-replacement)\n- [XML Attribute, Prefix and Namespace](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#xml-attribute-prefix-and-namespace)\n- [XML Arrays](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#xml-arrays)\n',
    targetSpecs: [{ namespace: 'openapi', version: '3.1.0' }],
  },
];

export default documentation;
