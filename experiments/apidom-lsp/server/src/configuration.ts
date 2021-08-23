import fs from 'fs';
import path from 'path';

import configurationAsyncApiDefault from './configuration/default/configuration-async-api.json';
import configurationOpenApiDefault from './configuration/default/configuration-open-api.json';
import { MetadataMap, Metadata, LinterFunctions } from '../../../../apidom/packages/apidom-ls';
import { ApidomSettings } from './server-types';
import {
  isObjectElement,
  isStringElement,
  Element,
  ObjectElement,
} from '../../../../apidom/packages/apidom';

export const exampleLinter = (element: Element): boolean => {
  if (
    element &&
    isObjectElement(element) &&
    isStringElement(element) &&
    element.element === 'info'
  ) {
    if (!(element as ObjectElement).get('description')) {
      return false;
    }
  }
  return true;
};

function loadLinterFunctions(dir: string): LinterFunctions {
  const linterFunctions: LinterFunctions = {};
  // TODO (francesco.tumanischvili@smartbear.com)  Use async version
  const dirContent = fs.readdirSync(dir);

  dirContent.forEach((file) => {
    const funcName = file.split('.')[0];
    if (!file.endsWith('~')) {
      try {
        // TODO (francesco.tumanischvili@smartbear.com) sanitize
        // eslint-disable-next-line no-eval,no-param-reassign
        linterFunctions[funcName] = eval(fs.readFileSync(path.join(dir, String(file))).toString());
      } catch (e) {
        console.log('error eval', e);
      }
    }
  });

  return linterFunctions;
}

// eslint-disable-next-line import/prefer-default-export
export function configuration(settings: ApidomSettings): Metadata {
  let configurationAsyncApi: MetadataMap = configurationAsyncApiDefault as MetadataMap;
  let configurationOpenApi: MetadataMap = configurationOpenApiDefault as MetadataMap;
  let linterFunctionsDirOpenApi = path.join(
    __dirname,
    'configuration',
    'default',
    'linter-functions-open-api',
  );
  let linterFunctionsDirAsyncApi = path.join(
    __dirname,
    'configuration',
    'default',
    'linter-functions-async-api',
  );

  if (settings.OpenApi?.metadataFile && settings.OpenApi?.metadataFile.length !== 0) {
    configurationOpenApi = JSON.parse(
      fs.readFileSync(path.join(settings.OpenApi?.metadataFile)).toString(),
    );
  }

  if (settings.AsyncApi?.metadataFile && settings.AsyncApi?.metadataFile.length !== 0) {
    configurationAsyncApi = JSON.parse(
      fs.readFileSync(path.join(settings.AsyncApi?.metadataFile)).toString(),
    );
  }

  if (settings.OpenApi?.linterFunctionDir && settings.OpenApi?.linterFunctionDir.length !== 0) {
    linterFunctionsDirOpenApi = path.join(settings.OpenApi?.linterFunctionDir);
  }
  if (settings.AsyncApi?.linterFunctionDir && settings.AsyncApi?.linterFunctionDir.length !== 0) {
    linterFunctionsDirAsyncApi = path.join(settings.AsyncApi?.linterFunctionDir);
  }

  const metadata: Metadata = {
    linterFunctions: {},
    metadataMaps: {},
  };

  metadata.metadataMaps = {
    openapi: configurationOpenApi,
    asyncapi: configurationAsyncApi,
  };
  metadata.linterFunctions = {
    openapi: loadLinterFunctions(linterFunctionsDirOpenApi),
    asyncapi: loadLinterFunctions(linterFunctionsDirAsyncApi),
  };

  return metadata;
}
