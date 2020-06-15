export { default as parse } from './parser';

export const mediaTypes = ['application/vnd.oai.openapi', 'application/vnd.oai.openapi+json'];

export const detect = (source: string): boolean =>
  !!source.match(/(["']?)openapi\1\s*:\s*(["']?)3\.\d+\.\d+\2/g);
