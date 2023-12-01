import { keyMap as keyMapBase, isElement, Element } from '@swagger-api/apidom-core';

// getNodeType :: Node -> String
export const getNodeType = <T extends Element>(element: T): string | undefined => {
  if (!isElement(element)) {
    return undefined;
  }
  return `${element.element.charAt(0).toUpperCase() + element.element.slice(1)}Element`;
};

/**
 * Workflows Specification 1.0.0
 */

export const keyMap = {
  WorkflowsSpecification1Element: ['content'],
  InfoElement: ['content'],
  SourceDescriptionElement: ['content'],
  StepElement: ['content'],
  ParameterElement: ['content'],
  SuccessActionElement: ['content'],
  FailureActionElement: ['content'],
  ComponentsElement: ['content'],
  CriterionElement: ['content'],
  ReferenceElement: ['content'],
  JSONSchemaDraft202012Element: ['content'],
  ...keyMapBase,
};
