import { isElement, keyMap as keyMapBase, Element } from '@swagger-api/apidom-core';

/**
 * @public
 */
export const getNodeType = <T extends Element>(element: T): string | undefined => {
  if (!isElement(element)) {
    return undefined;
  }
  return `${element.element.charAt(0).toUpperCase() + element.element.slice(1)}Element`;
};

/**
 * @public
 */
export const keyMap = {
  /**
   * API Design Systems 2021-05-07 specification elements.
   */
  MainElement: ['content'],
  InfoElement: ['content'],
  PrincipleElement: ['content'],
  StandardElement: ['content'],
  ScenarioElement: ['content'],
  RequirementElement: ['content'],
  StandardIdentifierElement: ['content'],
  RequirementLevelElement: [],
  ...keyMapBase,
};
