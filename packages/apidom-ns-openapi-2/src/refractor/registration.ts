import XmlElement from '../elements/Xml';
import SecurityDefinitionsElement from '../elements/SecurityDefinitions';
import SecuritySchemeElement from '../elements/SecurityScheme';
import ScopesElement from '../elements/Scopes';
import SecurityRequirementElement from '../elements/SecurityRequirement';
import { createRefractor } from './index';

// register refractors specific to element types
XmlElement.refract = createRefractor(['visitors', 'document', 'objects', 'XML', '$visitor']);
SecurityDefinitionsElement.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'SecurityDefinitions',
  '$visitor',
]);
SecuritySchemeElement.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'SecurityScheme',
  '$visitor',
]);
ScopesElement.refract = createRefractor(['visitors', 'document', 'objects', 'Scopes', '$visitor']);
SecurityRequirementElement.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'SecurityRequirement',
  '$visitor',
]);

export {
  XmlElement,
  SecurityDefinitionsElement,
  SecuritySchemeElement,
  ScopesElement,
  SecurityRequirementElement,
};
