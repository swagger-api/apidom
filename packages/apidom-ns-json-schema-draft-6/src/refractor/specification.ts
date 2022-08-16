import { pipe, assocPath, dissocPath } from 'ramda';
import { specificationObj } from '@swagger-api/apidom-ns-json-schema-draft-4';

import JSONSchemaVisitor from './visitors/json-schema';
import JSONSchema$idVisitor from './visitors/json-schema/$idVisitor';
import JSONSchemaContainsVisitor from './visitors/json-schema/ContainsVisitor';
import JSONSchemaItemsVisitor from './visitors/json-schema/ItemsVisitor';
import JSONSchemaPropertyNamesVisitor from './visitors/json-schema/PropertyNamesVisitor';
import JSONSchemaConstVisitor from './visitors/json-schema/ConstVisitor';
import JSONSchemaExamplesVisitor from './visitors/json-schema/ExamplesVisitor';
import LinkDescriptionVisitor from './visitors/json-schema/link-description';
import LinkDescriptionSubmissionEncTypeVisitor from './visitors/json-schema/link-description/SubmissionEncTypeVisitor';

// @ts-ignore
const specification = pipe(
  // JSON Schema object modifications
  assocPath(['visitors', 'document', 'objects', 'JSONSchema', '$visitor'], JSONSchemaVisitor),
  dissocPath(['visitors', 'document', 'objects', 'JSONSchema', 'fixedFields', 'id']),
  assocPath(
    ['visitors', 'document', 'objects', 'JSONSchema', 'fixedFields', '$id'],
    JSONSchema$idVisitor,
  ),
  assocPath(
    ['visitors', 'document', 'objects', 'JSONSchema', 'fixedFields', 'contains'],
    JSONSchemaContainsVisitor,
  ),
  assocPath(
    ['visitors', 'document', 'objects', 'JSONSchema', 'fixedFields', 'items'],
    JSONSchemaItemsVisitor,
  ),
  assocPath(
    ['visitors', 'document', 'objects', 'JSONSchema', 'fixedFields', 'propertyNames'],
    JSONSchemaPropertyNamesVisitor,
  ),
  assocPath(
    ['visitors', 'document', 'objects', 'JSONSchema', 'fixedFields', 'const'],
    JSONSchemaConstVisitor,
  ),
  assocPath(
    ['visitors', 'document', 'objects', 'JSONSchema', 'fixedFields', 'examples'],
    JSONSchemaExamplesVisitor,
  ),
  // Link Description object modifications
  assocPath(
    ['visitors', 'document', 'objects', 'LinkDescription', '$visitor'],
    LinkDescriptionVisitor,
  ),
  assocPath(
    ['visitors', 'document', 'objects', 'LinkDescription', 'fixedFields', 'hrefSchema'],
    specificationObj.visitors.JSONSchemaOrJSONReferenceVisitor,
  ),
  dissocPath(['visitors', 'document', 'objects', 'LinkDescription', 'fixedFields', 'schema']),
  assocPath(
    ['visitors', 'document', 'objects', 'LinkDescription', 'fixedFields', 'submissionSchema'],
    specificationObj.visitors.JSONSchemaOrJSONReferenceVisitor,
  ),
  dissocPath(['visitors', 'document', 'objects', 'LinkDescription', 'fixedFields', 'method']),
  dissocPath(['visitors', 'document', 'objects', 'LinkDescription', 'fixedFields', 'encType']),
  assocPath(
    ['visitors', 'document', 'objects', 'LinkDescription', 'fixedFields', 'submissionEncType'],
    LinkDescriptionSubmissionEncTypeVisitor,
  ),
)(specificationObj);

export default specification as typeof specificationObj;
