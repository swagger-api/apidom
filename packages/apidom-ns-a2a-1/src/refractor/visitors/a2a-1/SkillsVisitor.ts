import { Mixin } from 'ts-mixer';
import { ArrayElement, Element, BREAK } from '@swagger-api/apidom-core';

import SkillsElement from '../../../elements/nces/Skills.ts';
import SpecificationVisitor, { SpecificationVisitorOptions } from '../SpecificationVisitor.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../FallbackVisitor.ts';

/**
 * @public
 */
export interface SkillsVisitorOptions extends SpecificationVisitorOptions, FallbackVisitorOptions {}

/**
 * @public
 */
class SkillsVisitor extends Mixin(SpecificationVisitor, FallbackVisitor) {
  public readonly element: SkillsElement;

  constructor(options: SkillsVisitorOptions) {
    super(options);
    this.element = new SkillsElement();
  }

  ArrayElement(arrayElement: ArrayElement) {
    arrayElement.forEach((item: Element): void => {
      const specPath = ['document', 'objects', 'AgentSkill'];
      const element = this.toRefractedElement(specPath, item);

      this.element.push(element);
    });

    this.copyMetaAndAttributes(arrayElement, this.element);

    return BREAK;
  }
}

export default SkillsVisitor;
