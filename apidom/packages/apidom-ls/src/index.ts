// @ts-ignore
import ApiDOMParser from 'apidom-parser';
// @ts-ignore
import * as openapi3_1Adapter from 'apidom-parser-adapter-openapi-json-3-1';

export {
  isRefElement,
  isLinkElement,
  isMemberElement,
  isObjectElement,
  isArrayElement,
  isBooleanElement,
  isNullElement,
  isElement,
  isNumberElement,
  isStringElement,
} from 'apidom';

export const doit: () => Promise<string> = async () => {
  const parser = ApiDOMParser();

  const value = `{
    "openapi": "3.0.0",
      "info": {
        "version": "0.1.9"
      }
    }`;
  parser.use(openapi3_1Adapter);
  // parser.use(asyncapi2_0Adapter);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const parseResult = await parser.parse(value, { sourceMap: true });
  // console.log('Par', JSON.stringify(parseResult));
  return 'done';
};

export { default as getLanguageService } from './apidomLanguageService';

export type {
  LanguageService,
  LanguageSettings,
  SymbolsContext,
  ValidationContext,
  WorkspaceContextService,
  ColorsContext,
  LanguageServiceContext,
} from './apidomLanguageTypes';
