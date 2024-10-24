import { isElement, dehydrate } from '@swagger-api/apidom-core';

export { isElement as test };

export const print = (val) => JSON.stringify(dehydrate(val), null, 2);
