export const mediaTypes = [
  'application/vnd.aai.asyncapi;version=2.0.0',
  'application/vnd.aai.asyncapi+yaml;version=2.0.0',
];

export const detect = (source: string): boolean =>
  !!source.match(/(["']?)asyncapi\1\s*:\s*(["']?)3\.\d+\.\d+\2/g);
