/**
 * Keywords whose value is a single subschema (JSON Schema Draft 4 to 2020-12).
 * `items` is listed here and in SCHEMA_ARRAY_KEYWORDS; its shape decides which applies.
 */
export const SCHEMA_KEYWORDS = [
  'items',
  'additionalItems',
  'additionalProperties',
  'not',
  'contains',
  'if',
  'then',
  'else',
  'propertyNames',
  'unevaluatedItems',
  'unevaluatedProperties',
  'contentSchema',
] as const;

/**
 * Keywords whose value is an array of subschemas.
 */
export const SCHEMA_ARRAY_KEYWORDS = ['allOf', 'anyOf', 'oneOf', 'prefixItems', 'items'] as const;

/**
 * Keywords whose value is a map of subschemas.
 * `dependencies` values may also be arrays of property names; those are not subschemas.
 */
export const SCHEMA_MAP_KEYWORDS = [
  'properties',
  'patternProperties',
  '$defs',
  'definitions',
  'dependentSchemas',
  'dependencies',
] as const;

/**
 * Keywords removed from the converted schema, with a warning.
 */
export const DROPPED_KEYWORDS = [
  '$schema',
  '$comment',
  '$vocabulary',
  '$dynamicRef',
  '$dynamicAnchor',
  '$recursiveRef',
  '$recursiveAnchor',
  'minContains',
  'maxContains',
  'contentEncoding',
  'contentMediaType',
] as const;

/**
 * Identifier keywords, dropped once references to them are rewritten.
 */
export const IDENTIFIER_KEYWORDS = ['$id', 'id', '$anchor'] as const;

/**
 * Keywords moved to `x-conversion-<keyword>`, with a warning.
 */
export const MOVED_KEYWORDS = [
  '$defs',
  'definitions',
  'propertyNames',
  'contains',
  'unevaluatedProperties',
  'unevaluatedItems',
  'contentSchema',
  'additionalItems',
  'prefixItems',
  'patternProperties',
] as const;

/**
 * Keywords that are annotations or OpenAPI 3.0 extensions of the Schema Object.
 * They stay on a schema when its validation keywords are moved elsewhere.
 */
export const ANNOTATION_KEYWORDS = [
  'title',
  'description',
  'default',
  'example',
  'examples',
  'deprecated',
  'readOnly',
  'writeOnly',
  'nullable',
  'discriminator',
  'xml',
  'externalDocs',
] as const;

/**
 * Validation keywords that only apply to instances of one JSON type.
 */
export const TYPE_SPECIFIC_KEYWORDS: Record<string, readonly string[]> = {
  string: ['minLength', 'maxLength', 'pattern', 'format'],
  number: ['minimum', 'maximum', 'exclusiveMinimum', 'exclusiveMaximum', 'multipleOf', 'format'],
  integer: ['minimum', 'maximum', 'exclusiveMinimum', 'exclusiveMaximum', 'multipleOf', 'format'],
  object: [
    'properties',
    'patternProperties',
    'additionalProperties',
    'required',
    'minProperties',
    'maxProperties',
    'dependentRequired',
    'dependentSchemas',
    'dependencies',
    'propertyNames',
    'unevaluatedProperties',
  ],
  array: [
    'items',
    'prefixItems',
    'additionalItems',
    'minItems',
    'maxItems',
    'uniqueItems',
    'contains',
    'minContains',
    'maxContains',
    'unevaluatedItems',
  ],
  boolean: [],
  null: [],
};

/**
 * Keywords that, on their own, mark a schema as needing conversion.
 */
export const TRIGGER_KEYWORDS: ReadonlySet<string> = new Set<string>([
  ...DROPPED_KEYWORDS,
  ...IDENTIFIER_KEYWORDS,
  ...MOVED_KEYWORDS,
  'if',
  'then',
  'else',
  'dependentRequired',
  'dependentSchemas',
  'dependencies',
  'const',
  'examples',
]);

export const isExtensionKeyword = (keyword: string): boolean => keyword.startsWith('x-');
