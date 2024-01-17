import { OpenAPI2, OpenAPI30, OpenAPI31, OpenAPI3 } from '../target-specs';

const documentation = [
  {
    target: 'name',
    docs: 'Replaces the name of the element/attribute used for the described schema property. When defined within the Items Object (`items`), it will affect the name of the individual XML elements within the list. When defined alongside `type` being `array` (outside the `items`), it will affect the wrapping element and only if `wrapped` is `true`. If `wrapped` is `false`, it will be ignored.',
    targetSpecs: OpenAPI2,
  },
  {
    target: 'name',
    docs: 'Replaces the name of the element/attribute used for the described schema property. When defined within `items`, it will affect the name of the individual XML elements within the list. When defined alongside `type` being `array` (outside the `items`), it will affect the wrapping element and only if `wrapped` is `true`. If `wrapped` is `false`, it will be ignored.',
    targetSpecs: OpenAPI3,
  },
  {
    target: 'namespace',
    docs: 'The URL of the namespace definition. Value SHOULD be in the form of a URL.',
    targetSpecs: OpenAPI2,
  },
  {
    target: 'namespace',
    docs: 'The URI of the namespace definition. This MUST be in the form of an absolute URI.',
    targetSpecs: OpenAPI3,
  },
  {
    target: 'prefix',
    docs: 'The prefix to be used for the [name](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/2.0.md#xmlName).',
    targetSpecs: OpenAPI2,
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
    targetSpecs: [...OpenAPI2, ...OpenAPI3],
  },
  {
    target: 'wrapped',
    docs: 'MAY be used only for an array definition. Signifies whether the array is wrapped (for example, `<books><book/><book/></books>`) or unwrapped (`<book/><book/>`). Default value is `false`. The definition takes effect only when defined alongside `type` being `array` (outside the `items`).',
    targetSpecs: [...OpenAPI2, ...OpenAPI3],
  },
  /**
   * The original documentation has been trimmed in this implementation for readability purposes
   * A new custom section `Additional documentation topics` has been added,
   * which adds external links back to the original documentation
   */
  {
    docs: '#### [XML Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/2.0.md#xmlObject)\n\nA metadata object that allows for more fine-tuned XML model definitions.\n\nWhen using arrays, XML element names are *not* inferred (for singular/plural forms) and the `name` property should be used to add that information. See examples for expected behavior.\n\n##### Fixed Fields\nField Name | Type | Description\n---|:---:|---\nname | `string` | Replaces the name of the element/attribute used for the described schema property. When defined within the Items Object (`items`), it will affect the name of the individual XML elements within the list. When defined alongside `type` being `array` (outside the `items`), it will affect the wrapping element and only if `wrapped` is `true`. If `wrapped` is `false`, it will be ignored.\nnamespace | `string` | The URL of the namespace definition. Value SHOULD be in the form of a URL.\nprefix | `string` | The prefix to be used for the [name](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/2.0.md#xmlName).\nattribute | `boolean` | Declares whether the property definition translates to an attribute instead of an element. Default value is `false`.\nwrapped | `boolean` | MAY be used only for an array definition. Signifies whether the array is wrapped (for example, `<books><book/><book/></books>`) or unwrapped (`<book/><book/>`). Default value is `false`. The definition takes effect only when defined alongside `type` being `array` (outside the `items`).\n\n##### Patterned Objects\n\nField Pattern | Type | Description\n---|:---:|---\n^x- | Any | Allows extensions to the Swagger Schema. The field name MUST begin with `x-`, for example, `x-internal-id`. The value can be `null`, a primitive, an array or an object. See [Vendor Extensions](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/2.0.md#vendorExtensions) for further details.\n\n#### Additional documentation topics\n\n##### [XML Object Examples](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/2.0.md#xml-object-examples)\nThe examples of the XML object definitions are included inside a property definition of a [Schema Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/2.0.md#schemaObject) with a sample of the XML representation of it.\n\n- [No XML Element](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/2.0.md#no-xml-element)\n- [XML Name Replacement](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/2.0.md#xml-name-replacement)\n- [https://github.com/OAI/OpenAPI-Specification/blob/main/versions/2.0.md#xml-attribute-prefix-and-namespace)\n- [XML Arrays](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/2.0.md#xml-arrays)',
    targetSpecs: OpenAPI2,
  },
  {
    docs: '#### [XML Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#xmlObject)\n\nA metadata object that allows for more fine-tuned XML model definitions.\n\nWhen using arrays, XML element names are *not* inferred (for singular/plural forms) and the `name` property SHOULD be used to add that information.\nSee examples for expected behavior.\n\n##### Fixed Fields\nField Name | Type | Description\n---|:---:|---\nname | `string` | Replaces the name of the element/attribute used for the described schema property. When defined within `items`, it will affect the name of the individual XML elements within the list. When defined alongside `type` being `array` (outside the `items`), it will affect the wrapping element and only if `wrapped` is `true`. If `wrapped` is `false`, it will be ignored.\nnamespace | `string` | The URI of the namespace definition. Value MUST be in the form of an absolute URI.\nprefix | `string` | The prefix to be used for the [name](#xmlName).\nattribute | `boolean` | Declares whether the property definition translates to an attribute instead of an element. Default value is `false`.\nwrapped | `boolean` | MAY be used only for an array definition. Signifies whether the array is wrapped (for example, `<books><book/><book/></books>`) or unwrapped (`<book/><book/>`). Default value is `false`. The definition takes effect only when defined alongside `type` being `array` (outside the `items`).\n\nThis object MAY be extended with [Specification Extensions](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#specificationExtensions).\n\n#### Additional documentation topics\n\n##### [XML Object Examples](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#xml-object-examples)\nThe examples of the XML object definitions are included inside a property definition of a [Schema Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#schemaObject) with a sample of the XML representation of it.\n\n- [No XML Element](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#no-xml-element)\n- [XML Name Replacement](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#xml-name-replacement)\n- [XML Attribute, Prefix and Namespace](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#xml-attribute-prefix-and-namespace)\n- [XML Arrays](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#xml-arrays)',
    targetSpecs: OpenAPI30,
  },
  {
    docs: '#### [XML Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#xmlObject)\n\nA metadata object that allows for more fine-tuned XML model definitions.\n\nWhen using arrays, XML element names are *not* inferred (for singular/plural forms) and the `name` property SHOULD be used to add that information.\nSee examples for expected behavior.\n\n##### Fixed Fields\nField Name | Type | Description\n---|:---:|---\nname | `string` | Replaces the name of the element/attribute used for the described schema property. When defined within `items`, it will affect the name of the individual XML elements within the list. When defined alongside `type` being `array` (outside the `items`), it will affect the wrapping element and only if `wrapped` is `true`. If `wrapped` is `false`, it will be ignored.\nnamespace | `string` | The URI of the namespace definition. This MUST be in the form of an absolute URI.\nprefix | `string` | The prefix to be used for the [name](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#xmlName).\nattribute | `boolean` | Declares whether the property definition translates to an attribute instead of an element. Default value is `false`.\nwrapped | `boolean` | MAY be used only for an array definition. Signifies whether the array is wrapped (for example, `<books><book/><book/></books>`) or unwrapped (`<book/><book/>`). Default value is `false`. The definition takes effect only when defined alongside `type` being `array` (outside the `items`).\n\nThis object MAY be extended with [Specification Extensions](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#specificationExtensions).\n\n#### Additional documentation topics\n\n##### [XML Object Examples](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#xml-object-examples)\nThe examples of the XML object definitions are included inside a property definition of a [Schema Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#schemaObject) with a sample of the XML representation of it.\n\n- [No XML Element](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#no-xml-element)\n- [XML Name Replacement](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#xml-name-replacement)\n- [XML Attribute, Prefix and Namespace](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#xml-attribute-prefix-and-namespace)\n- [XML Arrays](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#xml-arrays)\n',
    targetSpecs: OpenAPI31,
  },
];

export default documentation;
