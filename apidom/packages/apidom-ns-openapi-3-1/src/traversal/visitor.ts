import { keyMap as keyMapBase, isElement, Element } from 'apidom';

// getNodeType :: Node -> String
export const getNodeType = <T extends Element>(element: T): string | undefined => {
  if (!isElement(element)) {
    return undefined;
  }
  return `${element.element.charAt(0).toUpperCase() + element.element.slice(1)}Element`;
};

export const keyMap = {
  CallbackElement: ['content'],
  ComponentsElement: ['content'],
  ContactElement: ['content'],
  ExternalDocumentationElement: ['content'],
  InfoElement: ['content'],
  LicenseElement: ['content'],
  OpenApi3_1Element: ['content'],
  OperationElement: ['content'],
  ParameterElement: ['content'],
  PathItemElement: ['content'],
  PathsElement: ['content'],
  ReferenceElement: ['content'],
  RequestBodyElement: ['content'],
  ResponseElement: ['content'],
  ResponsesElement: ['content'],
  SchemaElement: ['content'],
  SecurityRequirementElement: ['content'],
  ServerElement: ['content'],
  ServerVariableElement: ['content'],
  MediaTypeElement: ['content'],
  ...keyMapBase,
};
