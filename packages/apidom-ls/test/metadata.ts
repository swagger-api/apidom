import { config } from '../src/config/config.ts';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Metadata, MetadataMap } from '../src/apidom-language-types.ts';

// eslint-disable-next-line import/prefer-default-export
export function metadata(): Metadata {
  const defaultConfig = config() as Metadata;
  return defaultConfig;

  // example of  setting up own metadata for testing purposes.
  /* const oasDefaultConfig = defaultConfig.metadataMaps.openapi as MetadataMap;
  const oasTestConfig = {
    operation: oasDefaultConfig.operation,
    info: oasDefaultConfig.info,
  };

  const asyncapiDefaultConfig = defaultConfig.metadataMaps.asyncapi as MetadataMap;
  const asyncapiTestConfig = {
    operation: asyncapiDefaultConfig.operation,
    info: asyncapiDefaultConfig.info,
    asyncApiVersion: asyncapiDefaultConfig.asyncApiVersion,
  };
  return {
    metadataMaps: {
      openapi: oasTestConfig,
      asyncapi: asyncapiTestConfig,
    },
    linterFunctions: defaultConfig.linterFunctions,
  }; */
}
