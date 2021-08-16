// import fs, {appendFile} from 'fs';
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

// eslint-disable-next-line import/prefer-default-export
export function configuration(settings: ApidomSettings): Metadata {
  console.log('conf settings', JSON.stringify(settings, null, 2));
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

  console.log('settings.OpenAPI?.metadataFile', settings.OpenApi?.metadataFile);
  console.log('settings.AsyncApi?.metadataFile', settings.AsyncApi?.metadataFile);
  console.log('settings.AsyncApi?.linterFunctionDir', settings.AsyncApi?.linterFunctionDir);
  console.log('settings.OpenApi?.linterFunctionDir', settings.OpenApi?.linterFunctionDir);
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

  console.log('linterFunctionsDirOpenApi', linterFunctionsDirOpenApi);
  const linterFunctionsOpenApi: LinterFunctions = {};
  const linterFunctionsAsyncApi: LinterFunctions = {};

  const metadata: Metadata = {
    linterFunctions: {},
    metadataMaps: {},
  };

  // TODO (francesco.tumanischvili@smartbear.com)  Use async version
  const dirOpenApi = fs.readdirSync(linterFunctionsDirOpenApi);
  dirOpenApi.forEach((file) => {
    const funcName = file.split('.')[0];
    console.log(String(file));
    if (!file.endsWith('~')) {
      try {
        // TODO (francesco.tumanischvili@smartbear.com) sanitize
        // eslint-disable-next-line no-eval
        linterFunctionsOpenApi[funcName] = eval(
          fs.readFileSync(path.join(linterFunctionsDirOpenApi, String(file))).toString(),
        );
      } catch (e) {
        console.log('error eval', e);
      }
    }
  });

  // TODO (francesco.tumanischvili@smartbear.com)  Use async version
  const dirAsyncApi = fs.readdirSync(linterFunctionsDirAsyncApi);
  dirAsyncApi.forEach((file) => {
    const funcName = file.split('.')[0];
    console.log(String(file));
    if (!file.endsWith('~')) {
      try {
        // TODO (francesco.tumanischvili@smartbear.com) sanitize
        // eslint-disable-next-line no-eval
        linterFunctionsAsyncApi[funcName] = eval(
          fs.readFileSync(path.join(linterFunctionsDirAsyncApi, String(file))).toString(),
        );
      } catch (e) {
        console.log('error eval', e);
      }
    }
  });

  metadata.metadataMaps = {
    openapi: configurationOpenApi,
    asyncapi: configurationAsyncApi,
  };
  metadata.linterFunctions = {
    openapi: linterFunctionsOpenApi,
    asyncapi: linterFunctionsAsyncApi,
  };

  return metadata;
}
