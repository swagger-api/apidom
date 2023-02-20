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

import AnnotationElement from '../elements/Annotation';
import CommentElement from '../elements/Comment';
import ParseResultElement from '../elements/ParseResult';
import SourceMapElement from '../elements/SourceMap';
import { createRefractor } from './index';

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
SourceMapElement.refract = createRefractor(SourceMapElement);

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
  SourceMapElement,
};
