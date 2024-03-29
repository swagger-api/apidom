import SwaggerElement from '../elements/Swagger';
import SwaggerVersionElement from '../elements/SwaggerVersion';
import InfoElement from '../elements/Info';
import ContactElement from '../elements/Contact';
import LicenseElement from '../elements/License';
import PathsElement from '../elements/Paths';
import PathItemElement from '../elements/PathItem';
import OperationElement from '../elements/Operation';
import ExternalDocumentationElement from '../elements/ExternalDocumentation';
import ParameterElement from '../elements/Parameter';
import ItemsElement from '../elements/Items';
import ResponsesElement from '../elements/Responses';
import ResponseElement from '../elements/Response';
import HeadersElement from '../elements/Headers';
import ExampleElement from '../elements/Example';
import HeaderElement from '../elements/Header';
import TagElement from '../elements/Tag';
import ReferenceElement from '../elements/Reference';
import SchemaElement from '../elements/Schema';
import XmlElement from '../elements/Xml';
import DefinitionsElement from '../elements/Definitions';
import ParametersDefinitionsElement from '../elements/ParametersDefinitions';
import ResponsesDefinitionsElement from '../elements/ResponsesDefinitions';
import SecurityDefinitionsElement from '../elements/SecurityDefinitions';
import SecuritySchemeElement from '../elements/SecurityScheme';
import ScopesElement from '../elements/Scopes';
import SecurityRequirementElement from '../elements/SecurityRequirement';
import { createRefractor } from './index';

// register refractors specific to element types
SwaggerElement.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'Swagger',
  '$visitor',
]);
SwaggerVersionElement.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'SwaggerVersion',
  '$visitor',
]);
InfoElement.refract = createRefractor(['visitors', 'document', 'objects', 'Info', '$visitor']);
ContactElement.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'Contact',
  '$visitor',
]);
LicenseElement.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'License',
  '$visitor',
]);
PathsElement.refract = createRefractor(['visitors', 'document', 'objects', 'Paths', '$visitor']);
PathItemElement.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'PathItem',
  '$visitor',
]);
OperationElement.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'Operation',
  '$visitor',
]);
ExternalDocumentationElement.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'ExternalDocumentation',
  '$visitor',
]);
ParameterElement.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'Parameter',
  '$visitor',
]);
ItemsElement.refract = createRefractor(['visitors', 'document', 'objects', 'Items', '$visitor']);
ResponsesElement.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'Responses',
  '$visitor',
]);
ResponseElement.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'Response',
  '$visitor',
]);
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
ReferenceElement.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'Reference',
  '$visitor',
]);
SchemaElement.refract = createRefractor(['visitors', 'document', 'objects', 'Schema', '$visitor']);
XmlElement.refract = createRefractor(['visitors', 'document', 'objects', 'XML', '$visitor']);
DefinitionsElement.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'Definitions',
  '$visitor',
]);
ParametersDefinitionsElement.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'ParametersDefinitions',
  '$visitor',
]);
ResponsesDefinitionsElement.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'ResponsesDefinitions',
  '$visitor',
]);
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
  SwaggerElement,
  SwaggerVersionElement,
  InfoElement,
  ContactElement,
  LicenseElement,
  PathsElement,
  PathItemElement,
  OperationElement,
  ExternalDocumentationElement,
  ParameterElement,
  ItemsElement,
  ResponsesElement,
  ResponseElement,
  HeadersElement,
  ExampleElement,
  HeaderElement,
  TagElement,
  ReferenceElement,
  SchemaElement,
  XmlElement,
  DefinitionsElement,
  ParametersDefinitionsElement,
  ResponsesDefinitionsElement,
  SecurityDefinitionsElement,
  SecuritySchemeElement,
  ScopesElement,
  SecurityRequirementElement,
};
