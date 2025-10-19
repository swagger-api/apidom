import { path } from 'ramda';
import {
  Element,
  dereference,
  refract as baseRefract,
} from '@swagger-api/apidom-core';

import specification from './specification.ts';

const refract = <T extends Element>(value: unknown, { specPath = ['visitors','document','objects','AsyncApi','$visitor'], plugins = [], specificationObj = specification } = {}): T => {
  const element = baseRefract(value);
  const resolvedSpec = dereference(specificationObj);

  const RootVisitorClass = path(specPath, resolvedSpec) as any;
  const rootVisitor = new RootVisitorClass({ specObj: resolvedSpec });

  // Our visitor implementations currently expect direct invocation on ApiDOM elements
  // (they manually call child visitors). Call enter() directly to populate rootVisitor.element.
  rootVisitor.enter(element);

  // Return the populated element directly (skip plugin dispatch for now).
  return rootVisitor.element as unknown as T;
};

export default refract;
