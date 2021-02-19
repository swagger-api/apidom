import { refract as baseRefract } from 'minim';
import { Element, dereference } from 'apidom';
import { invokeArgs } from 'ramda-adjunct';

import { visit } from '../traversal/visitor';
import specification from './specification';

const refract = <T extends Element>(
  value: any,
  { specPath = ['visitors', 'document', 'objects', 'AsyncApi', '$visitor'] } = {},
): T => {
  const element = baseRefract(value);
  const resolvedSpec = dereference(specification);
  const visitor = invokeArgs(specPath, [], resolvedSpec);

  // @ts-ignore
  visit(element, visitor, { state: { specObj: resolvedSpec } });

  return visitor.element;
};

export const createRefractor = (specPath: string[]) => (value: any, options = {}) =>
  refract(value, { specPath, ...options });

export default refract;
