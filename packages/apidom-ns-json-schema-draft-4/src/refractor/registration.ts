import JSONSchemaElement from '../elements/JSONSchema';
import JSONReferenceElement from '../elements/JSONReference';
import MediaElement from '../elements/Media';
import LinkDescriptionElement from '../elements/LinkDescription';
import { createRefractor } from './index';

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
