import { Element } from 'apidom';

// eslint-disable-next-line import/prefer-default-export
export const appendMetadata = <T extends Element>(metadata: string[], element: T): T => {
  metadata.forEach((md: string) => {
    element.classes.push(md);
    element.getMetaProperty('symbols', []).push(md);
  });

  return element;
};
