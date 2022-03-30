import { Element } from 'minim';

import serializeValue from './value';

const serializer = (element: Element): string => JSON.stringify(serializeValue(element));

export default serializer;
