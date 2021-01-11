import { Element } from 'apidom';

import { ReferenceOptions as IReferenceOptions } from './types';
import { resolveApiDOM } from './resolve';
import parse from './parse';
import { merge as mergeOptions } from './options/util';

// 1. - gather all Reference Objects
// 2. - for each Reference Object
//    2.1. - look at the $ref property
//    2.2. - translate the $ref JSON Pointer into absolute URI JSON Pointer
//    2.3. - resolve the absolute URI JSON Pointer against data
//    2.4. - if resolved data is again a Reference (Like) Object repeat from 2.1

const dereference = async (uri: string, options: IReferenceOptions): Promise<Element> => {
  const parseResult = await parse(uri, options);
  const resolveOptions = mergeOptions(options, { resolve: { baseURI: uri } });
  const refSet = await resolveApiDOM(parseResult, resolveOptions);

  // @ts-ignore
  parseResult.refSet = refSet;

  return parseResult;
};

export default dereference;
