import { pipe, assocPath, dissocPath } from 'ramda';
import { specificationObj } from '@swagger-api/apidom-ns-json-schema-draft-6';

import JSONSchemaVisitor from './visitors/json-schema/index.ts';
import LinkDescriptionVisitor from './visitors/json-schema/link-description/index.ts';

const specification = pipe(
  // JSON Schema object modifications
  assocPath(['visitors', 'document', 'objects', 'JSONSchema', '$visitor'], JSONSchemaVisitor),
  assocPath(
    ['visitors', 'document', 'objects', 'JSONSchema', 'fixedFields', '$comment'],
    specificationObj.visitors.value,
  ),
  assocPath(
    ['visitors', 'document', 'objects', 'JSONSchema', 'fixedFields', 'if'],
    specificationObj.visitors.JSONSchemaOrJSONReferenceVisitor,
  ),
  assocPath(
    ['visitors', 'document', 'objects', 'JSONSchema', 'fixedFields', 'then'],
    specificationObj.visitors.JSONSchemaOrJSONReferenceVisitor,
  ),
  assocPath(
    ['visitors', 'document', 'objects', 'JSONSchema', 'fixedFields', 'else'],
    specificationObj.visitors.JSONSchemaOrJSONReferenceVisitor,
  ),
  dissocPath(['visitors', 'document', 'objects', 'JSONSchema', 'fixedFields', 'media']),
  assocPath(
    ['visitors', 'document', 'objects', 'JSONSchema', 'fixedFields', 'contentEncoding'],
    specificationObj.visitors.value,
  ),
  assocPath(
    ['visitors', 'document', 'objects', 'JSONSchema', 'fixedFields', 'contentMediaType'],
    specificationObj.visitors.value,
  ),
  assocPath(
    ['visitors', 'document', 'objects', 'JSONSchema', 'fixedFields', 'writeOnly'],
    specificationObj.visitors.value,
  ),
  // Link Description object modifications
  assocPath(
    ['visitors', 'document', 'objects', 'LinkDescription', '$visitor'],
    LinkDescriptionVisitor,
  ),
  assocPath(
    ['visitors', 'document', 'objects', 'LinkDescription', 'fixedFields', 'anchor'],
    specificationObj.visitors.value,
  ),
  assocPath(
    ['visitors', 'document', 'objects', 'LinkDescription', 'fixedFields', 'anchorPointer'],
    specificationObj.visitors.value,
  ),
  dissocPath(['visitors', 'document', 'objects', 'LinkDescription', 'fixedFields', 'mediaType']),
  assocPath(
    ['visitors', 'document', 'objects', 'LinkDescription', 'fixedFields', 'targetMediaType'],
    specificationObj.visitors.value,
  ),
  assocPath(
    ['visitors', 'document', 'objects', 'LinkDescription', 'fixedFields', 'targetHints'],
    specificationObj.visitors.value,
  ),
  assocPath(
    ['visitors', 'document', 'objects', 'LinkDescription', 'fixedFields', 'description'],
    specificationObj.visitors.value,
  ),
  assocPath(
    ['visitors', 'document', 'objects', 'LinkDescription', 'fixedFields', '$comment'],
    specificationObj.visitors.value,
  ),
  assocPath(
    ['visitors', 'document', 'objects', 'LinkDescription', 'fixedFields', 'headerSchema'],
    specificationObj.visitors.JSONSchemaOrJSONReferenceVisitor,
  ),
  dissocPath([
    'visitors',
    'document',
    'objects',
    'LinkDescription',
    'fixedFields',
    'submissionEncType',
  ]),
  assocPath(
    ['visitors', 'document', 'objects', 'LinkDescription', 'fixedFields', 'submissionMediaType'],
    specificationObj.visitors.value,
  ),
)(specificationObj);

export default specification as typeof specificationObj;
