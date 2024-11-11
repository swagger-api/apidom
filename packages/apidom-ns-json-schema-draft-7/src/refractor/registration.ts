import JSONSchemaElement from '../elements/JSONSchema.ts';
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

LinkDescriptionElement.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'LinkDescription',
  '$visitor',
]);

export { JSONSchemaElement, LinkDescriptionElement };
