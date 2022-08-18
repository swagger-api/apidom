import { pipe, assocPath, dissocPath } from 'ramda';
import { specificationObj } from '@swagger-api/apidom-ns-json-schema-draft-6';

import JSONSchemaVisitor from './visitors/json-schema';
import JSONSchema$commentVisitor from './visitors/json-schema/$commentVisitor';
import JsonSchemaContentEncodingVisitor from './visitors/json-schema/ContentEncodingVisitor';
import JsonSchemaContentMediaTypeVisitor from './visitors/json-schema/ContentMediaTypeVisitor';
import JsonSchemaWriteOnlyVisitor from './visitors/json-schema/WriteOnlyVisitor';
import LinkDescriptionVisitor from './visitors/json-schema/link-description';
import LinkDescriptionAnchorVisitor from './visitors/json-schema/link-description/AnchorVisitor';
import LinkDescriptionAnchorPointerVisitor from './visitors/json-schema/link-description/AnchorPointerVisitor';
import LinkDescriptionTargetMediaTypeVisitor from './visitors/json-schema/link-description/TargetMediaTypeVisitor';
import LinkDescriptionTargetHintsVisitor from './visitors/json-schema/link-description/TargetHintsVisitor';
import LinkDescriptionDescriptionVisitor from './visitors/json-schema/link-description/DescriptionVisitor';
import LinkDescription$commentVisitor from './visitors/json-schema/link-description/$commentVisitor';
import LinkDescriptionSubmissionMediaTypeVisitor from './visitors/json-schema/link-description/SubmissionMediaTypeVisitor';

const specification = pipe(
  // JSON Schema object modifications
  assocPath(['visitors', 'document', 'objects', 'JSONSchema', '$visitor'], JSONSchemaVisitor),
  assocPath(
    ['visitors', 'document', 'objects', 'JSONSchema', 'fixedFields', '$comment'],
    JSONSchema$commentVisitor,
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
    JsonSchemaContentEncodingVisitor,
  ),
  assocPath(
    ['visitors', 'document', 'objects', 'JSONSchema', 'fixedFields', 'contentMediaType'],
    JsonSchemaContentMediaTypeVisitor,
  ),
  assocPath(
    ['visitors', 'document', 'objects', 'JSONSchema', 'fixedFields', 'writeOnly'],
    JsonSchemaWriteOnlyVisitor,
  ),
  // Link Description object modifications
  assocPath(
    ['visitors', 'document', 'objects', 'LinkDescription', '$visitor'],
    LinkDescriptionVisitor,
  ),
  assocPath(
    ['visitors', 'document', 'objects', 'LinkDescription', 'fixedFields', 'anchor'],
    LinkDescriptionAnchorVisitor,
  ),
  assocPath(
    ['visitors', 'document', 'objects', 'LinkDescription', 'fixedFields', 'anchorPointer'],
    LinkDescriptionAnchorPointerVisitor,
  ),
  dissocPath(['visitors', 'document', 'objects', 'LinkDescription', 'fixedFields', 'mediaType']),
  assocPath(
    ['visitors', 'document', 'objects', 'LinkDescription', 'fixedFields', 'targetMediaType'],
    LinkDescriptionTargetMediaTypeVisitor,
  ),
  assocPath(
    ['visitors', 'document', 'objects', 'LinkDescription', 'fixedFields', 'targetHints'],
    LinkDescriptionTargetHintsVisitor,
  ),
  assocPath(
    ['visitors', 'document', 'objects', 'LinkDescription', 'fixedFields', 'description'],
    LinkDescriptionDescriptionVisitor,
  ),
  assocPath(
    ['visitors', 'document', 'objects', 'LinkDescription', 'fixedFields', '$comment'],
    LinkDescription$commentVisitor,
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
    LinkDescriptionSubmissionMediaTypeVisitor,
  ),
)(specificationObj);

export default specification as typeof specificationObj;
