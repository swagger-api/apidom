import InfoElement from '../elements/Info';
import LicenseElement from '../elements/License';
import ContactElement from '../elements/Contact';
import ExternalDocumentationElement from '../elements/ExternalDocumentation';
import XmlElement from '../elements/Xml';
import SecurityDefinitionsElement from '../elements/SecurityDefinitions';
import SecuritySchemeElement from '../elements/SecurityScheme';
import ScopesElement from '../elements/Scopes';
import SecurityRequirementElement from '../elements/SecurityRequirement';
import { createRefractor } from './index';

// register refractors specific to element types
InfoElement.refract = createRefractor(['visitors', 'document', 'objects', 'Info', '$visitor']);
LicenseElement.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'License',
  '$visitor',
]);
ContactElement.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'Contact',
  '$visitor',
]);
ExternalDocumentationElement.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'ExternalDocumentation',
  '$visitor',
]);
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
  InfoElement,
  LicenseElement,
  ContactElement,
  ExternalDocumentationElement,
  XmlElement,
  SecurityDefinitionsElement,
  SecuritySchemeElement,
  ScopesElement,
  SecurityRequirementElement,
};
