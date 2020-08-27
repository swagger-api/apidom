import { allPass, either, is } from 'ramda';
import { createPredicate } from 'apidom';

import AsyncApi2_0Element from './elements/AsyncApi2-0';
import AsyncapiElement from './elements/Asyncapi';
import IdentifierElement from './elements/Identifier';
import InfoElement from './elements/Info';
import LicenseElement from './elements/License';
import ContactElement from './elements/Contact';
import ComponentsElement from './elements/Components';
import SchemaElement from './elements/Schema';

export const isAsycApi2_0Element = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq, hasGetter, hasClass }) => {
    const isElementTypeAsyncApi2_0 = isElementType('asyncApi2-0');
    const primitiveEqObject = primitiveEq('object');
    const hasClassApi = hasClass('api');
    const hasGetterAsyncapi = hasGetter('asyncapi');
    const hasGetterId = hasGetter('id');
    const hasGetterInfo = hasGetter('info');
    const hasGetterComponents = hasGetter('components');

    return either(
      is(AsyncApi2_0Element),
      allPass([
        hasBasicElementProps,
        isElementTypeAsyncApi2_0,
        primitiveEqObject,
        hasClassApi,
        hasGetterAsyncapi,
        hasGetterId,
        hasGetterInfo,
        hasGetterComponents,
      ]),
    );
  },
);

export const isAsycapiElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq, hasGetter }) => {
    const isElementTypeAsyncapi = isElementType('asyncapi');
    const primitiveEqString = primitiveEq('string');
    const hasGetterLength = hasGetter('length');

    return either(
      is(AsyncapiElement),
      allPass([hasBasicElementProps, isElementTypeAsyncapi, primitiveEqString, hasGetterLength]),
    );
  },
);

export const isIdentifierElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq, hasGetter }) => {
    const isElementTypeIdentifier = isElementType('identifier');
    const primitiveEqString = primitiveEq('string');
    const hasGetterLength = hasGetter('length');

    return either(
      is(IdentifierElement),
      allPass([hasBasicElementProps, isElementTypeIdentifier, primitiveEqString, hasGetterLength]),
    );
  },
);

export const isInfoElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq, hasGetter }) => {
    const isElementTypeInfo = isElementType('info');
    const primitiveEqObject = primitiveEq('object');
    const hasGetterTitle = hasGetter('title');
    const hasGetterDescription = hasGetter('description');
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
    const hasGetterUrl = hasGetter('url');

    return either(
      is(LicenseElement),
      allPass([
        hasBasicElementProps,
        isElementTypeLicense,
        primitiveEqObject,
        hasGetterName,
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
    const hasGetterSchemes = hasGetter('schemes');

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
