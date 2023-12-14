/* eslint-disable camelcase */
import * as Comlink from 'comlink';
import { dehydrate, from, sexprs, toValue } from '@swagger-api/apidom-core';
import ApiDOMParser from '@swagger-api/apidom-parser';
import * as jsonAdapter from '@swagger-api/apidom-parser-adapter-json';
import * as yamlAdapter from '@swagger-api/apidom-parser-adapter-yaml-1-2';
import * as openapi2AdapterJson from '@swagger-api/apidom-parser-adapter-openapi-json-2';
import * as openapi2AdapterYaml from '@swagger-api/apidom-parser-adapter-openapi-yaml-2';
import * as openapi3_0AdapterJson from '@swagger-api/apidom-parser-adapter-openapi-json-3-0';
import * as openapi3_0AdapterYaml from '@swagger-api/apidom-parser-adapter-openapi-yaml-3-0';
import * as openapi3_1AdapterJson from '@swagger-api/apidom-parser-adapter-openapi-json-3-1';
import * as openapi3_1AdapterYaml from '@swagger-api/apidom-parser-adapter-openapi-yaml-3-1';
import * as asyncapi2AdapterJson from '@swagger-api/apidom-parser-adapter-asyncapi-json-2';
import * as asyncapi2AdapterYaml from '@swagger-api/apidom-parser-adapter-asyncapi-yaml-2';
import * as workflows1AdapterJson from '@swagger-api/apidom-parser-adapter-workflows-json-1';
import * as workflows1AdapterYaml from '@swagger-api/apidom-parser-adapter-workflows-yaml-1';
import {
  readFile,
  resolveApiDOM as resolveApiDOMReferences,
  dereferenceApiDOM as derefereceApiDOMReferences,
} from '@swagger-api/apidom-reference';

const parser = ApiDOMParser()
  .use(jsonAdapter)
  .use(yamlAdapter)
  .use(openapi2AdapterJson)
  .use(openapi2AdapterYaml)
  .use(openapi3_0AdapterJson)
  .use(openapi3_0AdapterYaml)
  .use(openapi3_1AdapterJson)
  .use(openapi3_1AdapterYaml)
  .use(asyncapi2AdapterJson)
  .use(asyncapi2AdapterYaml)
  .use(workflows1AdapterJson)
  .use(workflows1AdapterYaml);

/* eslint-disable */
const service = {
  async parse(source, { mediaType }) {
    const namespace = await parser.findNamespace(source, { sourceMap: true, mediaType });
    const parseResult = await parser.parse(source, { sourceMap: true, mediaType });
    const refract = dehydrate(parseResult, namespace);

    return JSON.stringify(refract, undefined, 2);
  },

  async readFile(url) {
    const buffer = await readFile(url, {});
    return buffer.toString();
  },

  async resolveApiDOM(apiDOM, { source, mediaType, baseURI }) {
    const namespace = await parser.findNamespace(source, { mediaType });
    const parseResult = from(apiDOM, namespace);

    return resolveApiDOMReferences(parseResult, { parse: { mediaType }, resolve: { baseURI } });
  },

  async dereferenceApiDOM(apiDOM, { source, mediaType, baseURI, interpreter }) {
    const namespace = await parser.findNamespace(source, { mediaType });
    const parseResult = from(apiDOM, namespace);
    const dereferenced = await derefereceApiDOMReferences(parseResult.api, {
      parse: { mediaType },
      resolve: { baseURI },
    });

    if (interpreter === 's-expression') {
      return { dereferenced: sexprs(dereferenced), interpreter };
    }
    if (interpreter === 'to-value') {
      const value = toValue(dereferenced);
      return { dereferenced: JSON.stringify(value, undefined, 2), interpreter };
    }
    // dehydrate
    const refract = dehydrate(dereferenced, namespace);
    return { dereferenced: JSON.stringify(refract, undefined, 2), interpreter };
  },
};

Comlink.expose(service, globalThis); // eslint-disable-line no-undef
/* eslint-enable */
