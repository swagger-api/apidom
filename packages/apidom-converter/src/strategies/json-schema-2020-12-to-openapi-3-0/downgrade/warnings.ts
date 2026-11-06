import {
  AnnotationElement,
  Element,
  assignSourceMap,
  hasElementSourceMap,
} from '@swagger-api/apidom-core';

/**
 * Collects warning annotations for changes that lose or move meaning.
 */
export interface Warnings {
  readonly annotations: AnnotationElement[];
  readonly add: (element: Element, code: string, message: string) => void;
}

export const createWarnings = (location?: string): Warnings => {
  const annotations: AnnotationElement[] = [];
  const add = (element: Element, code: string, message: string) => {
    const content = location ? `${message} (in ${location})` : message;
    const annotation = new AnnotationElement(content, { classes: ['warning'] }, { code });
    if (hasElementSourceMap(element)) {
      assignSourceMap(annotation, element);
    }
    annotations.push(annotation);
  };

  return { annotations, add };
};
