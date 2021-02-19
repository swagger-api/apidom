import { allPass, either, is } from 'ramda';
import { createPredicate } from 'apidom';

import AsyncApi2_0Element from './elements/AsyncApi2-0';
import AsyncApiVersionElement from './elements/AsyncApiVersion';
import ChannelBindingsElement from './elements/ChannelBindings';
import ChannelItemElement from './elements/ChannelItem';
import ChannelsElement from './elements/Channels';
import ComponentsElement from './elements/Components';
import ContactElement from './elements/Contact';
import IdentifierElement from './elements/Identifier';
import InfoElement from './elements/Info';
import LicenseElement from './elements/License';
import OperationElement from './elements/Operation';
import ParameterElement from './elements/Parameter';
import ParametersElement from './elements/Parameters';
import ReferenceElement from './elements/Reference';
import SchemaElement from './elements/Schema';
import SecurityRequirementElement from './elements/SecurityRequirement';
import ServerElement from './elements/Server';
import ServerBindingsElement from './elements/ServerBindings';
import ServersElement from './elements/Servers';
import ServerVariableElement from './elements/ServerVariable';

export const isAsyncApi2_0Element = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq, hasClass }) => {
    const isElementTypeAsyncApi2_0 = isElementType('asyncApi2-0');
    const primitiveEqObject = primitiveEq('object');
    const hasClassApi = hasClass('api');

    return either(
      is(AsyncApi2_0Element),
      allPass([hasBasicElementProps, isElementTypeAsyncApi2_0, primitiveEqObject, hasClassApi]),
    );
  },
);

export const isAsyncApiVersionElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq }) => {
    const isElementTypeAsyncApiVersion = isElementType('asyncApiVersion');
    const primitiveEqString = primitiveEq('string');

    return either(
      is(AsyncApiVersionElement),
      allPass([hasBasicElementProps, isElementTypeAsyncApiVersion, primitiveEqString]),
    );
  },
);

export const isChannelBindingsElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq }) => {
    const isElementTypeChannelBindings = isElementType('channelBindings');
    const primitiveEqString = primitiveEq('object');

    return either(
      is(ChannelBindingsElement),
      allPass([hasBasicElementProps, isElementTypeChannelBindings, primitiveEqString]),
    );
  },
);

export const isChannelItemElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq }) => {
    const isElementTypeChannelItem = isElementType('channelItem');
    const primitiveEqObject = primitiveEq('object');

    return either(
      is(ChannelItemElement),
      allPass([hasBasicElementProps, isElementTypeChannelItem, primitiveEqObject]),
    );
  },
);

export const isChannelsElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq }) => {
    const isElementTypeChannels = isElementType('channels');
    const primitiveEqObject = primitiveEq('object');

    return either(
      is(ChannelsElement),
      allPass([hasBasicElementProps, isElementTypeChannels, primitiveEqObject]),
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

export const isIdentifierElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq }) => {
    const isElementTypeIdentifier = isElementType('identifier');
    const primitiveEqString = primitiveEq('string');

    return either(
      is(IdentifierElement),
      allPass([hasBasicElementProps, isElementTypeIdentifier, primitiveEqString]),
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

export const isParametersElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq }) => {
    const isElementTypeParameters = isElementType('parameters');
    const primitiveEqObject = primitiveEq('object');

    return either(
      is(ParametersElement),
      allPass([hasBasicElementProps, isElementTypeParameters, primitiveEqObject]),
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

export const isServerBindingsElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq }) => {
    const isElementTypeServerBindings = isElementType('serverBindings');
    const primitiveEqObject = primitiveEq('object');

    return either(
      is(ServerBindingsElement),
      allPass([hasBasicElementProps, isElementTypeServerBindings, primitiveEqObject]),
    );
  },
);

export const isServersElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq }) => {
    const isElementTypeServers = isElementType('servers');
    const primitiveEqObject = primitiveEq('object');

    return either(
      is(ServersElement),
      allPass([hasBasicElementProps, isElementTypeServers, primitiveEqObject]),
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
