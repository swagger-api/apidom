import SecuritySchemeElement from '../elements/SecurityScheme';
import ScopesElement from '../elements/ScopesElement';
import SecurityRequirementElement from '../elements/SecurityRequirement';
import { createRefractor } from './index';

// register refractors specific to element types
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

export { SecuritySchemeElement, ScopesElement, SecurityRequirementElement };
