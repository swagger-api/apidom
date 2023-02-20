import JSONSchemaElement from '../elements/JSONSchema';
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

LinkDescriptionElement.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'LinkDescription',
  '$visitor',
]);

export { JSONSchemaElement, LinkDescriptionElement };
