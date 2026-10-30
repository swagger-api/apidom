import { CompletionItemKind, InsertTextFormat } from 'vscode-languageserver-types';

import {
  ApidomCompletionItem,
  CompletionFormat,
  CompletionType,
} from '../../../../apidom-language-types.ts';
import { JSONSchema202012 } from '../target-specs.ts';

const completion: ApidomCompletionItem[] = [
  {
    label: 'anchor',
    insertText: 'anchor',
    kind: CompletionItemKind.Keyword,
    format: CompletionFormat.QUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: InsertTextFormat.Snippet,
    documentation: {
      kind: 'markdown',
      value:
        '#### [anchor](https://json-schema.org/draft/2019-09/draft-handrews-json-schema-hyperschema-02#rfc.section.6.1.1)\n\nThis property sets the context URI of the link. The value of the property is a URI Template, and the resulting URI-reference MUST be resolved against the base URI of the instance.\n\nThe URI is computed from the provided URI template using the same process described for the "href" property, with the exception that "hrefSchema" MUST NOT be applied. Unlike target URIs, context URIs do not accept user input.',
    },
    targetSpecs: JSONSchema202012,
  },
  {
    label: 'anchorPointer',
    insertText: 'anchorPointer',
    kind: CompletionItemKind.Keyword,
    format: CompletionFormat.QUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: InsertTextFormat.Snippet,
    documentation: {
      kind: 'markdown',
      value:
        '#### [anchorPointer](https://json-schema.org/draft/2019-09/draft-handrews-json-schema-hyperschema-02#rfc.section.6.1.2)\n\nThis property changes the point within the instance that is considered to be the context resource of the link. The value of the property MUST be a valid JSON Pointer in JSON String representation form, or a valid Relative JSON Pointer which is evaluated relative to the default context.\n\nThe result of processing this keyword SHOULD be a URI fragment if the media type of the instance allows for such a fragment. Otherwise it MUST be a string-encoded JSON Pointer.',
    },
    targetSpecs: JSONSchema202012,
  },
  {
    label: 'rel',
    insertText: 'rel',
    kind: CompletionItemKind.Keyword,
    format: CompletionFormat.QUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: InsertTextFormat.Snippet,
    documentation: {
      kind: 'markdown',
      value:
        '#### [rel](https://json-schema.org/draft/2019-09/draft-handrews-json-schema-hyperschema-02#rfc.section.6.2.1)\n\nThe value of this property MUST be either a string or an array of strings. If the value is an array, it MUST contain at least one string.\n\nEach string MUST be a single Link Relation Type as defined in RFC 8288, Section 2.1, including the restriction that additional semantics SHOULD NOT be inferred based upon the presence or absence of another link relation type.',
    },
    targetSpecs: JSONSchema202012,
  },
  {
    label: 'href',
    insertText: 'href',
    kind: CompletionItemKind.Keyword,
    format: CompletionFormat.QUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: InsertTextFormat.Snippet,
    documentation: {
      kind: 'markdown',
      value:
        '#### [href](https://json-schema.org/draft/2019-09/draft-handrews-json-schema-hyperschema-02#rfc.section.6.3.1)\n\nThe value of the "href" link description property is a template used to determine the target URI of the related resource. The value of the instance property MUST be resolved as a URI-reference against the base URI of the instance.',
    },
    targetSpecs: JSONSchema202012,
  },
  {
    label: 'hrefSchema',
    insertText: 'hrefSchema',
    kind: CompletionItemKind.Keyword,
    format: CompletionFormat.OBJECT,
    type: CompletionType.PROPERTY,
    insertTextFormat: InsertTextFormat.Snippet,
    documentation: {
      kind: 'markdown',
      value:
        '#### [hrefSchema](https://json-schema.org/draft/2019-09/draft-handrews-json-schema-hyperschema-02#rfc.section.6.6.1)\n\nThe value of the "hrefSchema" link description property MUST be a valid JSON Schema. This schema is used to validate user input or other user agent data for filling out the URI Template in "href".\n\nOmitting "hrefSchema" or setting the entire schema to "false" prevents any user agent data from being accepted.',
    },
    targetSpecs: JSONSchema202012,
  },
  {
    label: 'templatePointers',
    insertText: 'templatePointers',
    kind: CompletionItemKind.Keyword,
    format: CompletionFormat.OBJECT,
    type: CompletionType.PROPERTY,
    insertTextFormat: InsertTextFormat.Snippet,
    documentation: {
      kind: 'markdown',
      value:
        '#### [templatePointers](https://json-schema.org/draft/2019-09/draft-handrews-json-schema-hyperschema-02#rfc.section.6.4.1)\n\nThe value of the "templatePointers" link description property MUST be an object. Each property value in the object MUST be a valid JSON Pointer, or a valid Relative JSON Pointer which is evaluated relative to the attachment point of the link for which the template is being resolved.\n\nFor each property name in the object that matches a variable name in the template being resolved, the value of that property adjusts the starting position of variable resolution for that variable. Properties which do not match template variable names in the template being resolved MUST be ignored.',
    },
    targetSpecs: JSONSchema202012,
  },
  {
    label: 'templateRequired',
    insertText: 'templateRequired',
    kind: CompletionItemKind.Keyword,
    format: CompletionFormat.ARRAY,
    type: CompletionType.PROPERTY,
    insertTextFormat: InsertTextFormat.Snippet,
    documentation: {
      kind: 'markdown',
      value:
        "#### [templateRequired](https://json-schema.org/draft/2019-09/draft-handrews-json-schema-hyperschema-02#rfc.section.6.4.2)\n\nThe value of this keyword MUST be an array, and the elements MUST be unique. Each element SHOULD match a variable in the link's URI Template, without percent-encoding. After completing the entire URI Template resolution process, if any variable that is present in this array does not have a value, the link MUST NOT be used.",
    },
    targetSpecs: JSONSchema202012,
  },
  {
    label: 'title',
    insertText: 'title',
    kind: CompletionItemKind.Keyword,
    format: CompletionFormat.QUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: InsertTextFormat.Snippet,
    documentation: {
      kind: 'markdown',
      value:
        '#### [title](https://json-schema.org/draft/2019-09/draft-handrews-json-schema-hyperschema-02#rfc.section.6.5.1)\n\nThis property defines a title for the link. The value MUST be a string.\n\nUser agents MAY use this title when presenting the link to the user.',
    },
    targetSpecs: JSONSchema202012,
  },
  {
    label: 'description',
    insertText: 'description',
    kind: CompletionItemKind.Keyword,
    format: CompletionFormat.QUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: InsertTextFormat.Snippet,
    documentation: {
      kind: 'markdown',
      value:
        '#### [description](https://json-schema.org/draft/2019-09/draft-handrews-json-schema-hyperschema-02#rfc.section.6.5.2)\n\nThis property provides additional information beyond what is present in the title. The value MUST be a string. While a title is preferably short, a description can be used to go into more detail about the purpose and usage of the link.\n\nUser agents MAY use this description when presenting the link to the user.',
    },
    targetSpecs: JSONSchema202012,
  },
  {
    label: 'targetSchema',
    insertText: 'targetSchema',
    kind: CompletionItemKind.Keyword,
    format: CompletionFormat.OBJECT,
    type: CompletionType.PROPERTY,
    insertTextFormat: InsertTextFormat.Snippet,
    documentation: {
      kind: 'markdown',
      value:
        "#### [targetSchema](https://json-schema.org/draft/2019-09/draft-handrews-json-schema-hyperschema-02#rfc.section.6.5.4)\n\nThis property provides a schema that is expected to describe the link target's representation. Depending on the protocol, the schema may or may not describe the request or response to any particular operation performed with the link. See the JSON Hyper-Schema and HTTP section for an in-depth discussion of how this keyword is used with HTTP.",
    },
    targetSpecs: JSONSchema202012,
  },
  {
    label: 'targetMediaType',
    insertText: 'targetMediaType',
    kind: CompletionItemKind.Keyword,
    format: CompletionFormat.QUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: InsertTextFormat.Snippet,
    documentation: {
      kind: 'markdown',
      value:
        '#### [targetMediaType](https://json-schema.org/draft/2019-09/draft-handrews-json-schema-hyperschema-02#rfc.section.6.5.3)\n\nThe value of this property represents the media type RFC 2046, that is expected to be returned when fetching this resource. This property value MAY be a media range instead, using the same pattern defined in RFC 7231, section 5.3.2 - HTTP "Accept" header.\n\nWhen no such protocol-specific information is available, or when the implementation does not recognize the protocol involved, then the value SHOULD be taken to be "application/json".',
    },
    targetSpecs: JSONSchema202012,
  },
  {
    label: 'targetHints',
    insertText: 'targetHints',
    kind: CompletionItemKind.Keyword,
    format: CompletionFormat.OBJECT,
    type: CompletionType.PROPERTY,
    insertTextFormat: InsertTextFormat.Snippet,
    documentation: {
      kind: 'markdown',
      value:
        '#### [targetHints](https://json-schema.org/draft/2019-09/draft-handrews-json-schema-hyperschema-02#rfc.section.6.5.5)\n\nThe value of this property is advisory only. It represents information that is expected to be discoverable through interacting with the target resource, typically in the form of protocol-specific control information or meta-data such as headers returned in response to an HTTP HEAD or OPTIONS request. The protocol is determined by the "href" URI scheme, although note that resources are not guaranteed to be accessible over such a protocol.\n\nThe value of this property SHOULD be an object. The keys to this object SHOULD be lower-cased forms of the control data field names. Each value SHOULD be an array, in order to uniformly handle multi-valued fields. Multiple values MUST be presented as an array, and not as a single string.',
    },
    targetSpecs: JSONSchema202012,
  },
  {
    label: 'headerSchema',
    insertText: 'headerSchema',
    kind: CompletionItemKind.Keyword,
    format: CompletionFormat.OBJECT,
    type: CompletionType.PROPERTY,
    insertTextFormat: InsertTextFormat.Snippet,
    documentation: {
      kind: 'markdown',
      value:
        '#### [headerSchema](https://json-schema.org/draft/2019-09/draft-handrews-json-schema-hyperschema-02#rfc.section.6.6.2)\n\nIf present, this property is a schema for protocol-specific request headers or analogous control and meta-data. The value of this object MUST be a valid JSON Schema. The protocol is determined by the "href" URI scheme, although note that resources are not guaranteed to be accessible over such a protocol. The schema is advisory only; the target resource\'s behavior is not constrained by its presence.',
    },
    targetSpecs: JSONSchema202012,
  },
  {
    label: 'submissionMediaType',
    insertText: 'submissionMediaType',
    kind: CompletionItemKind.Keyword,
    format: CompletionFormat.QUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: InsertTextFormat.Snippet,
    documentation: {
      kind: 'markdown',
      value:
        '#### [submissionMediaType](https://json-schema.org/draft/2019-09/draft-handrews-json-schema-hyperschema-02#rfc.section.6.6.4.1)\n\nIf present, this property indicates the media type format the client application and user agent should use for the request payload described by "submissionSchema".\n\nOmitting this keyword has the same behavior as a value of application/json.',
    },
    targetSpecs: JSONSchema202012,
  },
  {
    label: 'submissionSchema',
    insertText: 'submissionSchema',
    kind: CompletionItemKind.Keyword,
    format: CompletionFormat.OBJECT,
    type: CompletionType.PROPERTY,
    insertTextFormat: InsertTextFormat.Snippet,
    documentation: {
      kind: 'markdown',
      value:
        '#### [submissionSchema](https://json-schema.org/draft/2019-09/draft-handrews-json-schema-hyperschema-02#rfc.section.6.6.4.2)\n\nThis property contains a schema which defines the acceptable structure of the document to be encoded according to the "submissionMediaType" property and sent to the target resource for processing. This can be viewed as describing the domain of the processing function implemented by the target resource.\n\nOmitting "submissionSchema" has the same behavior as a value of "true".',
    },
    targetSpecs: JSONSchema202012,
  },
  {
    label: '$comment',
    insertText: '\\$comment',
    kind: CompletionItemKind.Keyword,
    format: CompletionFormat.QUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: InsertTextFormat.Snippet,
    documentation: {
      kind: 'markdown',
      value:
        '#### [$comment](https://json-schema.org/draft/2020-12/draft-bhutton-json-schema-01.html#section-8.3)\n\nThis keyword reserves a location for comments from schema authors to readers or maintainers of the schema.\n\nThe value of this keyword MUST be a string. Implementations MUST NOT present this string to end users. Tools for editing schemas SHOULD support displaying and editing this keyword. The value of this keyword MAY be used in debug or error output which is intended for developers making use of schemas.',
    },
    targetSpecs: JSONSchema202012,
  },
];

export default completion;
