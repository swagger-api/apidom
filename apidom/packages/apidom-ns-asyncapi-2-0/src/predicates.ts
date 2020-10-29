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
import ChannelsElement from './elements/Channels';
import ChannelItemElement from './elements/ChannelItem';
import ServersElement from './elements/Servers';
import ServerElement from './elements/Server';
import ServerVariableElement from './elements/ServerVariable';

export const isAsycApi2_0Element = createPredicate(
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

export const isAsycapiElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq }) => {
    const isElementTypeAsyncapi = isElementType('asyncapi');
    const primitiveEqString = primitiveEq('string');

    return either(
      is(AsyncapiElement),
      allPass([hasBasicElementProps, isElementTypeAsyncapi, primitiveEqString]),
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

export const isServersElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq }) => {
    const isElementTypeChannels = isElementType('servers');
    const primitiveEqObject = primitiveEq('object');

    return either(
      is(ServersElement),
      allPass([hasBasicElementProps, isElementTypeChannels, primitiveEqObject]),
    );
  },
);

export const isServerElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq }) => {
    const isElementTypeChannels = isElementType('server');
    const primitiveEqObject = primitiveEq('object');

    return either(
      is(ServerElement),
      allPass([hasBasicElementProps, isElementTypeChannels, primitiveEqObject]),
    );
  },
);

export const isServerVariableElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq }) => {
    const isElementTypeChannels = isElementType('serverVariable');
    const primitiveEqObject = primitiveEq('object');

    return either(
      is(ServerVariableElement),
      allPass([hasBasicElementProps, isElementTypeChannels, primitiveEqObject]),
    );
  },
);

export const isComponentsElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq }) => {
    const isElementTypeInfo = isElementType('components');
    const primitiveEqObject = primitiveEq('object');

    return either(
      is(ComponentsElement),
      allPass([hasBasicElementProps, isElementTypeInfo, primitiveEqObject]),
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
