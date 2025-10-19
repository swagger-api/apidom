export const isReferenceObject = (node: any) => {
  if (!node || typeof node !== 'object') return false;
  // ApiDOM value may expose $ref directly
  return typeof node.$ref === 'string' || (typeof node.get === 'function' && node.get('$ref'));
};

export default {
  isReferenceObject,
};
