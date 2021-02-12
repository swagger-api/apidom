import { refract as baseRefract } from 'minim';
import { Element } from 'apidom';
import { invokeArgs } from 'ramda-adjunct';

import { visit } from '../traversal/visitor';
import specification, { dereference } from './specification';

const refract = <T extends Element>(
  value: any,
  {
    specPath = ['visitors', 'document', 'objects', 'AsyncApi', '$visitor'],
    specObj = specification,
  } = {},
): T => {
  const element = baseRefract(value);
  const resolvedSpec = dereference(specObj);
  const visitor = invokeArgs(specPath, [], resolvedSpec);

  // @ts-ignore
  visit(element, visitor, { state: { specObj: resolvedSpec } });

  return visitor.element;
};

export const createRefractor = (specPath: string[]) => (value: any, options = {}) =>
  refract(value, { specPath, ...options });

export default refract;
