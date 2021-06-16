import {
  ObjectElement,
  ArrayElement,
  StringElement,
  BooleanElement,
  NullElement,
  NumberElement,
  LinkElement,
  RefElement,
} from 'minim';

ObjectElement.refract = (val: any) => new ObjectElement(val);
ArrayElement.refract = (val: any) => new ArrayElement(val);
StringElement.refract = (val: any) => new StringElement(val);
BooleanElement.refract = (val: any) => new BooleanElement(val);
NullElement.refract = (val: any) => new NullElement(val);
NumberElement.refract = (val: any) => new NumberElement(val);
LinkElement.refract = (val: any) => new LinkElement(val);
RefElement.refract = (val: any) => new RefElement(val);
