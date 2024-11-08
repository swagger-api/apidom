import JSONSchemaElement from '../elements/JSONSchema.ts';
import JSONReferenceElement from '../elements/JSONReference.ts';
import MediaElement from '../elements/Media.ts';
import LinkDescriptionElement from '../elements/LinkDescription.ts';
import { createRefractor } from './index.ts';

// register refractors specific to element types

JSONSchemaElement.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'JSONSchema',
  '$visitor',
]);

JSONReferenceElement.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'JSONReference',
  '$visitor',
]);

MediaElement.refract = createRefractor(['visitors', 'document', 'objects', 'Media', '$visitor']);

LinkDescriptionElement.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'LinkDescription',
  '$visitor',
]);

export { JSONSchemaElement, JSONReferenceElement, MediaElement, LinkDescriptionElement };
