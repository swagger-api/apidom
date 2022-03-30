import { Element } from 'minim';

const serializer = (element: Element): any => element.toValue();

export default serializer;
