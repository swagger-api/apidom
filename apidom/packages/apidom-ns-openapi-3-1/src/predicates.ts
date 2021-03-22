import { allPass, either, is } from 'ramda';
import { createPredicate } from 'apidom';

import CallbackElement from './elements/Callback';
import ComponentsElement from './elements/Components';
import ContactElement from './elements/Contact';
import ExternalDocumentationElement from './elements/ExternalDocumentation';
import InfoElement from './elements/Info';
import LicenseElement from './elements/License';
import OpenapiElement from './elements/Openapi';
import OpenApi3_1Element from './elements/OpenApi3-1';
import OperationElement from './elements/Operation';
import ParameterElement from './elements/Parameter';
import PathItemElement from './elements/PathItem';
import PathsElement from './elements/Paths';
import ReferenceElement from './elements/Reference';
import RequestBodyElement from './elements/RequestBody';
import ResponseElement from './elements/Response';
import ResponsesElement from './elements/Responses';
import SchemaElement from './elements/Schema';
import SecurityRequirementElement from './elements/SecurityRequirement';
import ServerElement from './elements/Server';
import ServerVariableElement from './elements/ServerVariable';
import MediaTypeElement from './elements/MediaType';

export const isCallbackElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq }) => {
    const isElementTypeCallback = isElementType('callback');
    const primitiveEqObject = primitiveEq('object');

    return either(
      is(CallbackElement),
      allPass([hasBasicElementProps, isElementTypeCallback, primitiveEqObject]),
    );
  },
);

export const isComponentsElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq }) => {
    const isElementTypeComponents = isElementType('components');
    const primitiveEqObject = primitiveEq('object');

    return either(
      is(ComponentsElement),
      allPass([hasBasicElementProps, isElementTypeComponents, primitiveEqObject]),
    );
  },
);

export const isContactElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq }) => {
    const isElementTypeContact = isElementType('contact');
    const primitiveEqObject = primitiveEq('object');

    return either(
      is(ContactElement),
      allPass([hasBasicElementProps, isElementTypeContact, primitiveEqObject]),
    );
  },
);

export const isExternalDocumentationElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq }) => {
    const isElementTypeExternalDocumentation = isElementType('externalDocumentation');
    const primitiveEqObject = primitiveEq('object');

    return either(
      is(ExternalDocumentationElement),
      allPass([hasBasicElementProps, isElementTypeExternalDocumentation, primitiveEqObject]),
    );
  },
);

export const isInfoElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq }) => {
    const isElementTypeInfo = isElementType('info');
    const primitiveEqObject = primitiveEq('object');

    return either(
      is(InfoElement),
      allPass([hasBasicElementProps, isElementTypeInfo, primitiveEqObject]),
    );
  },
);

export const isLicenseElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq }) => {
    const isElementTypeLicense = isElementType('license');
    const primitiveEqObject = primitiveEq('object');

    return either(
      is(LicenseElement),
      allPass([hasBasicElementProps, isElementTypeLicense, primitiveEqObject]),
    );
  },
);

export const isOpenapiElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq }) => {
    const isElementTypeOpenapi = isElementType('openapi');
    const primitiveEqString = primitiveEq('string');

    return either(
      is(OpenapiElement),
      allPass([hasBasicElementProps, isElementTypeOpenapi, primitiveEqString]),
    );
  },
);

export const isOpenApi3_1Element = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq, hasClass }) => {
    const isElementTypeOpenApi3_1 = isElementType('openApi3-1');
    const primitiveEqObject = primitiveEq('object');
    const hasClassApi = hasClass('api');

    return either(
      is(OpenApi3_1Element),
      allPass([hasBasicElementProps, isElementTypeOpenApi3_1, primitiveEqObject, hasClassApi]),
    );
  },
);

export const isOperationElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq }) => {
    const isElementTypeOperation = isElementType('operation');
    const primitiveEqObject = primitiveEq('object');

    return either(
      is(OperationElement),
      allPass([hasBasicElementProps, isElementTypeOperation, primitiveEqObject]),
    );
  },
);

export const isParameterElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq }) => {
    const isElementTypeParameter = isElementType('parameter');
    const primitiveEqObject = primitiveEq('object');

    return either(
      is(ParameterElement),
      allPass([hasBasicElementProps, isElementTypeParameter, primitiveEqObject]),
    );
  },
);

export const isPathItemElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq }) => {
    const isElementTypePathItem = isElementType('pathItem');
    const primitiveEqObject = primitiveEq('object');

    return either(
      is(PathItemElement),
      allPass([hasBasicElementProps, isElementTypePathItem, primitiveEqObject]),
    );
  },
);

export const isPathsElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq }) => {
    const isElementTypePaths = isElementType('paths');
    const primitiveEqObject = primitiveEq('object');

    return either(
      is(PathsElement),
      allPass([hasBasicElementProps, isElementTypePaths, primitiveEqObject]),
    );
  },
);

export const isReferenceElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq }) => {
    const isElementTypeReference = isElementType('reference');
    const primitiveEqObject = primitiveEq('object');

    return either(
      is(ReferenceElement),
      allPass([hasBasicElementProps, isElementTypeReference, primitiveEqObject]),
    );
  },
);

export const isRequestBodyElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq }) => {
    const isElementTypeRequestBody = isElementType('requestBody');
    const primitiveEqObject = primitiveEq('object');

    return either(
      is(RequestBodyElement),
      allPass([hasBasicElementProps, isElementTypeRequestBody, primitiveEqObject]),
    );
  },
);

export const isResponseElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq }) => {
    const isElementTypeResponse = isElementType('response');
    const primitiveEqObject = primitiveEq('object');

    return either(
      is(ResponseElement),
      allPass([hasBasicElementProps, isElementTypeResponse, primitiveEqObject]),
    );
  },
);

export const isResponsesElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq }) => {
    const isElementTypeResponses = isElementType('responses');
    const primitiveEqObject = primitiveEq('object');

    return either(
      is(ResponsesElement),
      allPass([hasBasicElementProps, isElementTypeResponses, primitiveEqObject]),
    );
  },
);

export const isSchemaElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq }) => {
    const isElementTypeSchema = isElementType('schema');
    const primitiveEqObject = primitiveEq('object');

    return either(
      is(SchemaElement),
      allPass([hasBasicElementProps, isElementTypeSchema, primitiveEqObject]),
    );
  },
);

export const isSecurityRequirementElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq }) => {
    const isElementTypeSecurityRequirement = isElementType('securityRequirement');
    const primitiveEqObject = primitiveEq('object');

    return either(
      is(SecurityRequirementElement),
      allPass([hasBasicElementProps, isElementTypeSecurityRequirement, primitiveEqObject]),
    );
  },
);

export const isServerElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq }) => {
    const isElementTypeServer = isElementType('server');
    const primitiveEqObject = primitiveEq('object');

    return either(
      is(ServerElement),
      allPass([hasBasicElementProps, isElementTypeServer, primitiveEqObject]),
    );
  },
);

export const isServerVariableElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq }) => {
    const isElementTypeServerVariable = isElementType('serverVariable');
    const primitiveEqObject = primitiveEq('object');

    return either(
      is(ServerVariableElement),
      allPass([hasBasicElementProps, isElementTypeServerVariable, primitiveEqObject]),
    );
  },
);

export const isMediaTypeElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq }) => {
    const isElementTypeMediaType = isElementType('mediaType');
    const primitiveEqObject = primitiveEq('object');

    return either(
      is(MediaTypeElement),
      allPass([hasBasicElementProps, isElementTypeMediaType, primitiveEqObject]),
    );
  },
);
