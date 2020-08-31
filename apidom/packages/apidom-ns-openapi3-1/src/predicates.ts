import { allPass, either, is } from 'ramda';
import { createPredicate } from 'apidom';

import ComponentsElement from './elements/Components';
import ContactElement from './elements/Contact';
import InfoElement from './elements/Info';
import LicenseElement from './elements/License';
import OpenapiElement from './elements/Openapi';
import OpenApi3_1Element from './elements/OpenApi3-1';
import SchemaElement from './elements/Schema';
import ServerElement from './elements/Server';
import ServerVariableElement from './elements/ServerVariable';
import PathsElement from './elements/Paths';
import PathItemElement from './elements/PathItem';

export const isOpenApiApi3_1Element = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq, hasGetter, hasClass }) => {
    const isElementTypeOpenApi3_1 = isElementType('openApi3-1');
    const primitiveEqObject = primitiveEq('object');
    const hasClassApi = hasClass('api');
    const hasGetterOpenapi = hasGetter('openapi');
    const hasGetterInfo = hasGetter('info');
    const hasGetterServers = hasGetter('servers');
    const hasGetterComponents = hasGetter('components');

    return either(
      is(OpenApi3_1Element),
      allPass([
        hasBasicElementProps,
        isElementTypeOpenApi3_1,
        primitiveEqObject,
        hasClassApi,
        hasGetterOpenapi,
        hasGetterInfo,
        hasGetterServers,
        hasGetterComponents,
      ]),
    );
  },
);

export const isOpenapiElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq, hasGetter }) => {
    const isElementTypeOpenapi = isElementType('openapi');
    const primitiveEqString = primitiveEq('string');
    const hasGetterLength = hasGetter('length');

    return either(
      is(OpenapiElement),
      allPass([hasBasicElementProps, isElementTypeOpenapi, primitiveEqString, hasGetterLength]),
    );
  },
);

export const isInfoElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq, hasGetter }) => {
    const isElementTypeInfo = isElementType('info');
    const primitiveEqObject = primitiveEq('object');
    const hasGetterTitle = hasGetter('title');
    const hasGetterDescription = hasGetter('description');
    const hasGetterSummary = hasGetter('summary');
    const hasGetterTermsOfService = hasGetter('termsOfService');
    const hasGetterVersion = hasGetter('version');
    const hasGetterLicense = hasGetter('license');
    const hasGetterContact = hasGetter('contact');

    return either(
      is(InfoElement),
      allPass([
        hasBasicElementProps,
        isElementTypeInfo,
        primitiveEqObject,
        hasGetterTitle,
        hasGetterDescription,
        hasGetterSummary,
        hasGetterTermsOfService,
        hasGetterVersion,
        hasGetterLicense,
        hasGetterContact,
      ]),
    );
  },
);

export const isLicenseElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq, hasGetter }) => {
    const isElementTypeLicense = isElementType('license');
    const primitiveEqObject = primitiveEq('object');
    const hasGetterName = hasGetter('name');
    const hasGetterIdentifier = hasGetter('identifier');
    const hasGetterUrl = hasGetter('url');

    return either(
      is(LicenseElement),
      allPass([
        hasBasicElementProps,
        isElementTypeLicense,
        primitiveEqObject,
        hasGetterName,
        hasGetterIdentifier,
        hasGetterUrl,
      ]),
    );
  },
);

export const isContactElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq, hasGetter }) => {
    const isElementTypeContact = isElementType('contact');
    const primitiveEqObject = primitiveEq('object');
    const hasGetterName = hasGetter('name');
    const hasGetterUrl = hasGetter('url');
    const hasGetterEmail = hasGetter('email');

    return either(
      is(ContactElement),
      allPass([
        hasBasicElementProps,
        isElementTypeContact,
        primitiveEqObject,
        hasGetterName,
        hasGetterUrl,
        hasGetterEmail,
      ]),
    );
  },
);

export const isComponentsElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq, hasGetter }) => {
    const isElementTypeInfo = isElementType('components');
    const primitiveEqObject = primitiveEq('object');
    const hasGetterSchemes = hasGetter('schemas');

    return either(
      is(ComponentsElement),
      allPass([hasBasicElementProps, isElementTypeInfo, primitiveEqObject, hasGetterSchemes]),
    );
  },
);

export const isSchemaElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq }) => {
    const isElementTypeInfo = isElementType('schema');
    const primitiveEqObject = primitiveEq('object');

    return either(
      is(SchemaElement),
      allPass([hasBasicElementProps, isElementTypeInfo, primitiveEqObject]),
    );
  },
);

export const isServerElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq, hasGetter }) => {
    const isElementTypeInfo = isElementType('server');
    const primitiveEqObject = primitiveEq('object');
    const hasGetterUrl = hasGetter('url');
    const hasGetterDescription = hasGetter('description');
    const hasGetterVariables = hasGetter('variables');

    return either(
      is(ServerElement),
      allPass([
        hasBasicElementProps,
        isElementTypeInfo,
        primitiveEqObject,
        hasGetterUrl,
        hasGetterDescription,
        hasGetterVariables,
      ]),
    );
  },
);

export const isServerVariableElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq, hasGetter }) => {
    const isElementTypeInfo = isElementType('serverVariable');
    const primitiveEqObject = primitiveEq('object');
    const hasGetterDefault = hasGetter('default');
    const hasGetterDescription = hasGetter('description');
    const hasGetterEnum = hasGetter('enum');

    return either(
      is(ServerVariableElement),
      allPass([
        hasBasicElementProps,
        isElementTypeInfo,
        primitiveEqObject,
        hasGetterDefault,
        hasGetterDescription,
        hasGetterEnum,
      ]),
    );
  },
);

export const isPathsElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq }) => {
    const isElementTypeInfo = isElementType('paths');
    const primitiveEqObject = primitiveEq('object');

    return either(
      is(PathsElement),
      allPass([hasBasicElementProps, isElementTypeInfo, primitiveEqObject]),
    );
  },
);

export const isPathItemElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq, hasGetter }) => {
    const isElementTypeInfo = isElementType('pathItem');
    const primitiveEqObject = primitiveEq('object');
    const hasGetter$Ref = hasGetter('$ref');
    const hasGetterSummary = hasGetter('summary');
    const hasGetterDescription = hasGetter('description');
    const hasGetterGET = hasGetter('GET');
    const hasGetterPUT = hasGetter('PUT');
    const hasGetterPOST = hasGetter('POST');
    const hasGetterDELETE = hasGetter('DELETE');
    const hasGetterOPTIONS = hasGetter('OPTIONS');
    const hasGetterHEAD = hasGetter('HEAD');
    const hasGetterPATCH = hasGetter('PATCH');
    const hasGetterTRACE = hasGetter('TRACE');

    return either(
      is(PathItemElement),
      allPass([
        hasBasicElementProps,
        isElementTypeInfo,
        primitiveEqObject,
        hasGetter$Ref,
        hasGetterSummary,
        hasGetterDescription,
        hasGetterGET,
        hasGetterPUT,
        hasGetterPOST,
        hasGetterDELETE,
        hasGetterOPTIONS,
        hasGetterHEAD,
        hasGetterPATCH,
        hasGetterTRACE,
      ]),
    );
  },
);
