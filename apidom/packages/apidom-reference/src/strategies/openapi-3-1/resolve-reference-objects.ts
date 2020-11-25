import { Element, filter } from 'apidom';

import { isExternalReferenceElement } from './predicates';

const resolve = <T extends Element>(element: T) => {
  const externalReferences = filter(isExternalReferenceElement)(element);
  console.dir(externalReferences);
};

export default resolve;
