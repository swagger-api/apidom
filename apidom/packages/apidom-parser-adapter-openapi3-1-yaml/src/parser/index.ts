import { createNamespace } from 'apidom';
import openapi3_1 from 'apidom-ns-openapi3-1';

export const namespace = createNamespace(openapi3_1);

const parse = async (source: string, { parser = null } = {}): Promise<any> => {
  // @ts-ignore
  return parser.parse(source);
};

export default parse;
