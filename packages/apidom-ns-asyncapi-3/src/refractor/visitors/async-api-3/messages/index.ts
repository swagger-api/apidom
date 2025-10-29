import { Mixin } from 'ts-mixer';
import { always } from 'ramda';

import MessagesElement from '../../../../elements/Messages.ts';
import FallbackVisitor from '../../FallbackVisitor.ts';
import MapVisitor from '../../generics/MapVisitor.ts';
import { SpecPath } from '../../generics/FixedFieldsVisitor.ts';


class MessagesVisitor extends Mixin(MapVisitor, FallbackVisitor) {
  declare public readonly element: MessagesElement;
  declare protected readonly specPath: SpecPath<['document', 'objects', 'Messages']>;
  declare protected readonly canSupportSpecificationExtensions: true;

  constructor(options: any) {
    super(options);
    this.element = new MessagesElement();
    this.specPath = always(['document', 'objects', 'Messages']);
    this.canSupportSpecificationExtensions = true;
  }
}

export default MessagesVisitor;