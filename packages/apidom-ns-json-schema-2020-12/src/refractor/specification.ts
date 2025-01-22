import { pipe, assocPath, dissocPath } from 'ramda';
import { specificationObj } from '@swagger-api/apidom-ns-json-schema-2019-09';

import JSONSchemaVisitor from './visitors/json-schema/index.ts';
import JSONSchemaPrefixItemsVisitor from './visitors/json-schema/PrefixItemsVisitor.ts';
import JSONSchemaLinkDescriptionVisitor from './visitors/json-schema/link-description/index.ts';

const specification = pipe(
  // JSON Schema object modifications
  assocPath(['visitors', 'document', 'objects', 'JSONSchema', '$visitor'], JSONSchemaVisitor),
  dissocPath(['visitors', 'document', 'objects', 'JSONSchema', 'fixedFields', '$recursiveAnchor']),
  assocPath(
    ['visitors', 'document', 'objects', 'JSONSchema', 'fixedFields', '$dynamicAnchor'],
    specificationObj.visitors.value,
  ),
  dissocPath(['visitors', 'document', 'objects', 'JSONSchema', 'fixedFields', '$recursiveRef']),
  assocPath(
    ['visitors', 'document', 'objects', 'JSONSchema', 'fixedFields', '$dynamicRef'],
    specificationObj.visitors.value,
  ),
  assocPath(
    ['visitors', 'document', 'objects', 'JSONSchema', 'fixedFields', 'not'],
    JSONSchemaVisitor,
  ),
  assocPath(
    ['visitors', 'document', 'objects', 'JSONSchema', 'fixedFields', 'if'],
    JSONSchemaVisitor,
  ),
  assocPath(
    ['visitors', 'document', 'objects', 'JSONSchema', 'fixedFields', 'then'],
    JSONSchemaVisitor,
  ),
  assocPath(
    ['visitors', 'document', 'objects', 'JSONSchema', 'fixedFields', 'else'],
    JSONSchemaVisitor,
  ),
  assocPath(
    ['visitors', 'document', 'objects', 'JSONSchema', 'fixedFields', 'prefixItems'],
    JSONSchemaPrefixItemsVisitor,
  ),
  assocPath(
    ['visitors', 'document', 'objects', 'JSONSchema', 'fixedFields', 'items'],
    JSONSchemaVisitor,
  ),
  assocPath(
    ['visitors', 'document', 'objects', 'JSONSchema', 'fixedFields', 'contains'],
    JSONSchemaVisitor,
  ),
  assocPath(
    ['visitors', 'document', 'objects', 'JSONSchema', 'fixedFields', 'additionalProperties'],
    JSONSchemaVisitor,
  ),
  dissocPath(['visitors', 'document', 'objects', 'JSONSchema', 'fixedFields', 'additionalItems']),
  assocPath(
    ['visitors', 'document', 'objects', 'JSONSchema', 'fixedFields', 'propertyNames'],
    JSONSchemaVisitor,
  ),
  assocPath(
    ['visitors', 'document', 'objects', 'JSONSchema', 'fixedFields', 'unevaluatedItems'],
    JSONSchemaVisitor,
  ),
  assocPath(
    ['visitors', 'document', 'objects', 'JSONSchema', 'fixedFields', 'unevaluatedProperties'],
    JSONSchemaVisitor,
  ),
  assocPath(
    ['visitors', 'document', 'objects', 'JSONSchema', 'fixedFields', 'contentSchema'],
    JSONSchemaVisitor,
  ),
  // Link Description object modifications
  assocPath(
    ['visitors', 'document', 'objects', 'LinkDescription', '$visitor'],
    JSONSchemaLinkDescriptionVisitor,
  ),
  assocPath(
    ['visitors', 'document', 'objects', 'LinkDescription', 'fixedFields', 'targetSchema'],
    JSONSchemaVisitor,
  ),
  assocPath(
    ['visitors', 'document', 'objects', 'LinkDescription', 'fixedFields', 'hrefSchema'],
    JSONSchemaVisitor,
  ),
  assocPath(
    ['visitors', 'document', 'objects', 'LinkDescription', 'fixedFields', 'headerSchema'],
    JSONSchemaVisitor,
  ),
  assocPath(
    ['visitors', 'document', 'objects', 'LinkDescription', 'fixedFields', 'submissionSchema'],
    JSONSchemaVisitor,
  ),
)(specificationObj);

export default specification as typeof specificationObj;
