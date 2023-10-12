import InfoElement from '../elements/Info';
import LicenseElement from '../elements/License';
import ContactElement from '../elements/Contact';
import ExternalDocumentationElement from '../elements/ExternalDocumentation';
import ItemsElement from '../elements/Items';
import HeadersElement from '../elements/Headers';
import ExampleElement from '../elements/Example';
import HeaderElement from '../elements/Header';
import TagElement from '../elements/Tag';
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
ItemsElement.refract = createRefractor(['visitors', 'document', 'objects', 'Items', '$visitor']);
HeadersElement.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'Headers',
  '$visitor',
]);
ExampleElement.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'Example',
  '$visitor',
]);
HeaderElement.refract = createRefractor(['visitors', 'document', 'objects', 'Header', '$visitor']);
TagElement.refract = createRefractor(['visitors', 'document', 'objects', 'Tag', '$visitor']);
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
  ItemsElement,
  HeadersElement,
  ExampleElement,
  HeaderElement,
  TagElement,
  XmlElement,
  SecurityDefinitionsElement,
  SecuritySchemeElement,
  ScopesElement,
  SecurityRequirementElement,
};
