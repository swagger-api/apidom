import SecurityRequirementElement from '../elements/SecurityRequirement';
import { createRefractor } from './index';

// register refractors specific to element types
SecurityRequirementElement.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'SecurityRequirement',
  '$visitor',
]);

// eslint-disable-next-line import/prefer-default-export
export { SecurityRequirementElement };
