import { pipe, assocPath, dissocPath } from 'ramda';
import { specificationObj } from '@swagger-api/apidom-ns-json-schema-draft-7';

import JSONSchemaVisitor from './visitors/json-schema/index.ts';
import JSONSchema$vocabularyVisitor from './visitors/json-schema/$vocabularyVisitor.ts';
import JSONSchema$refVisitor from './visitors/json-schema/$refVisitor.ts';
import JSONSchema$defsVisitor from './visitors/json-schema/$defsVisitor.ts';
import JSONSchemaAllOfVisitor from './visitors/json-schema/AllOfVisitor.ts';
import JSONSchemaAnyOfVisitor from './visitors/json-schema/AnyOfVisitor.ts';
import JSONSchemaOneOfVisitor from './visitors/json-schema/OneOfVisitor.ts';
import JSONSchemaDependentSchemasVisitor from './visitors/json-schema/DependentSchemasVisitor.ts';
import JSONSchemaItemsVisitor from './visitors/json-schema/ItemsVisitor.ts';
import JSONSchemaPropertiesVisitor from './visitors/json-schema/PropertiesVisitor.ts';
import JSONSchemaPatternPropertiesVisitor from './visitors/json-schema/PatternPropertiesVisitor.ts';
import JSONSchemaDependentRequiredVisitor from './visitors/json-schema/DependentRequiredVisitor.ts';
import JSONSchemaLinkDescriptionVisitor from './visitors/json-schema/link-description/index.ts';

const specification = pipe(
  // JSON Schema object modifications
  assocPath(['visitors', 'document', 'objects', 'JSONSchema', '$visitor'], JSONSchemaVisitor),
  assocPath(
    ['visitors', 'document', 'objects', 'JSONSchema', 'fixedFields', '$vocabulary'],
    JSONSchema$vocabularyVisitor,
  ),
  assocPath(
    ['visitors', 'document', 'objects', 'JSONSchema', 'fixedFields', '$anchor'],
    specificationObj.visitors.value,
  ),
  assocPath(
    ['visitors', 'document', 'objects', 'JSONSchema', 'fixedFields', '$recursiveAnchor'],
    specificationObj.visitors.value,
  ),
  assocPath(
    ['visitors', 'document', 'objects', 'JSONSchema', 'fixedFields', '$recursiveRef'],
    specificationObj.visitors.value,
  ),
  dissocPath(['visitors', 'document', 'objects', 'JSONReference', '$visitor']),
  assocPath(
    ['visitors', 'document', 'objects', 'JSONSchema', 'fixedFields', '$ref'],
    JSONSchema$refVisitor,
  ),
  dissocPath(['visitors', 'document', 'objects', 'JSONSchema', 'fixedFields', 'definitions']),
  assocPath(
    ['visitors', 'document', 'objects', 'JSONSchema', 'fixedFields', '$defs'],
    JSONSchema$defsVisitor,
  ),
  assocPath(
    ['visitors', 'document', 'objects', 'JSONSchema', 'fixedFields', 'allOf'],
    JSONSchemaAllOfVisitor,
  ),
  assocPath(
    ['visitors', 'document', 'objects', 'JSONSchema', 'fixedFields', 'anyOf'],
    JSONSchemaAnyOfVisitor,
  ),
  assocPath(
    ['visitors', 'document', 'objects', 'JSONSchema', 'fixedFields', 'oneOf'],
    JSONSchemaOneOfVisitor,
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
  dissocPath(['visitors', 'document', 'objects', 'JSONSchema', 'fixedFields', 'dependencies']),
  assocPath(
    ['visitors', 'document', 'objects', 'JSONSchema', 'fixedFields', 'dependentSchemas'],
    JSONSchemaDependentSchemasVisitor,
  ),
  assocPath(
    ['visitors', 'document', 'objects', 'JSONSchema', 'fixedFields', 'items'],
    JSONSchemaItemsVisitor,
  ),
  assocPath(
    ['visitors', 'document', 'objects', 'JSONSchema', 'fixedFields', 'contains'],
    JSONSchemaVisitor,
  ),
  assocPath(
    ['visitors', 'document', 'objects', 'JSONSchema', 'fixedFields', 'properties'],
    JSONSchemaPropertiesVisitor,
  ),
  assocPath(
    ['visitors', 'document', 'objects', 'JSONSchema', 'fixedFields', 'patternProperties'],
    JSONSchemaPatternPropertiesVisitor,
  ),
  assocPath(
    ['visitors', 'document', 'objects', 'JSONSchema', 'fixedFields', 'additionalProperties'],
    JSONSchemaVisitor,
  ),
  assocPath(
    ['visitors', 'document', 'objects', 'JSONSchema', 'fixedFields', 'additionalItems'],
    JSONSchemaVisitor,
  ),
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
    ['visitors', 'document', 'objects', 'JSONSchema', 'fixedFields', 'maxContains'],
    specificationObj.visitors.value,
  ),
  assocPath(
    ['visitors', 'document', 'objects', 'JSONSchema', 'fixedFields', 'minContains'],
    specificationObj.visitors.value,
  ),
  assocPath(
    ['visitors', 'document', 'objects', 'JSONSchema', 'fixedFields', 'dependentRequired'],
    JSONSchemaDependentRequiredVisitor,
  ),
  assocPath(
    ['visitors', 'document', 'objects', 'JSONSchema', 'fixedFields', 'deprecated'],
    specificationObj.visitors.value,
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
