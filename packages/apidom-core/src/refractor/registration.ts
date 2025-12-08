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

import AnnotationElement from '../elements/Annotation.ts';
import CommentElement from '../elements/Comment.ts';
import ParseResultElement from '../elements/ParseResult.ts';
import { createRefractor } from './index.ts';

ObjectElement.refract = createRefractor(ObjectElement);
ArrayElement.refract = createRefractor(ArrayElement);
StringElement.refract = createRefractor(StringElement);
BooleanElement.refract = createRefractor(BooleanElement);
NullElement.refract = createRefractor(NullElement);
NumberElement.refract = createRefractor(NumberElement);
LinkElement.refract = createRefractor(LinkElement);
RefElement.refract = createRefractor(RefElement);

AnnotationElement.refract = createRefractor(AnnotationElement);
CommentElement.refract = createRefractor(CommentElement);
ParseResultElement.refract = createRefractor(ParseResultElement);

export {
  ObjectElement,
  ArrayElement,
  StringElement,
  BooleanElement,
  NullElement,
  NumberElement,
  LinkElement,
  RefElement,
  AnnotationElement,
  CommentElement,
  ParseResultElement,
};
