import { isElement } from '@swagger-api/apidom-core';

export const isAsyncApi3Element = (node: unknown) =>
  isElement(node) && node.element === 'asyncApi3';
export const isInfoElement = (node: unknown) => isElement(node) && node.element === 'info';
export const isChannelsElement = (node: unknown) => isElement(node) && node.element === 'channels';
export const isComponentsElement = (node: unknown) =>
  isElement(node) && node.element === 'components';
export const isMessageElement = (node: unknown) => isElement(node) && node.element === 'message';

export default {};
