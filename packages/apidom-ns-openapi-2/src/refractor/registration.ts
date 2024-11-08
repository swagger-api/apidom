import SwaggerElement from '../elements/Swagger.ts';
import SwaggerVersionElement from '../elements/SwaggerVersion.ts';
import InfoElement from '../elements/Info.ts';
import ContactElement from '../elements/Contact.ts';
import LicenseElement from '../elements/License.ts';
import PathsElement from '../elements/Paths.ts';
import PathItemElement from '../elements/PathItem.ts';
import OperationElement from '../elements/Operation.ts';
import ExternalDocumentationElement from '../elements/ExternalDocumentation.ts';
import ParameterElement from '../elements/Parameter.ts';
import ItemsElement from '../elements/Items.ts';
import ResponsesElement from '../elements/Responses.ts';
import ResponseElement from '../elements/Response.ts';
import HeadersElement from '../elements/Headers.ts';
import ExampleElement from '../elements/Example.ts';
import HeaderElement from '../elements/Header.ts';
import TagElement from '../elements/Tag.ts';
import ReferenceElement from '../elements/Reference.ts';
import SchemaElement from '../elements/Schema.ts';
import XmlElement from '../elements/Xml.ts';
import DefinitionsElement from '../elements/Definitions.ts';
import ParametersDefinitionsElement from '../elements/ParametersDefinitions.ts';
import ResponsesDefinitionsElement from '../elements/ResponsesDefinitions.ts';
import SecurityDefinitionsElement from '../elements/SecurityDefinitions.ts';
import SecuritySchemeElement from '../elements/SecurityScheme.ts';
import ScopesElement from '../elements/Scopes.ts';
import SecurityRequirementElement from '../elements/SecurityRequirement.ts';
import { createRefractor } from './index.ts';

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
