/* eslint-disable camelcase */
import * as Comlink from 'comlink';
import { dehydrate, from } from 'apidom';
import ApiDOMParser from 'apidom-parser';
import * as jsonAdapter from 'apidom-parser-adapter-json';
import * as yamlAdapter from 'apidom-parser-adapter-yaml-1-2';
import * as openapi3_1AdapterJson from 'apidom-parser-adapter-openapi-json-3-1';
import * as openapi3_1AdapterYaml from 'apidom-parser-adapter-openapi-yaml-3-1';
import * as asyncapi2_0AdapterJson from 'apidom-parser-adapter-asyncapi-json-2-0';
import * as asyncapi2_0AdapterYaml from 'apidom-parser-adapter-asyncapi-yaml-2-0';
import {
  readFile,
  resolveApiDOM as resolveApiDOMReferences,
  dereferenceApiDOM as derefereceApiDOMReferences,
} from 'apidom-reference';

const parser = ApiDOMParser()
  .use(jsonAdapter)
  .use(yamlAdapter)
  .use(openapi3_1AdapterJson)
  .use(openapi3_1AdapterYaml)
  .use(asyncapi2_0AdapterJson)
  .use(asyncapi2_0AdapterYaml);

/* eslint-disable */
const service = {
  async parse(source, { mediaType }) {
    const namespace = parser.findNamespace(source, { sourceMap: true, mediaType });
    const parseResult = await parser.parse(source, { sourceMap: true, mediaType });
    const refract = dehydrate(parseResult, namespace);

    return JSON.stringify(refract, undefined, 2);
  },

  async readFile(url) {
    const buffer = await readFile(url, {});
    return buffer.toString();
  },

  async resolveApiDOM(apiDOM, { source, mediaType, baseURI }) {
    const namespace = parser.findNamespace(source, { mediaType });
    const parseResult = from(apiDOM, namespace);

    return resolveApiDOMReferences(parseResult, { parse: { mediaType }, resolve: { baseURI } });
  },

  async dereferenceApiDOM(apiDOM, { source, mediaType, baseURI }) {
    const namespace = parser.findNamespace(source, { mediaType });
    const parseResult = from(apiDOM, namespace);
    const dereferenced = await derefereceApiDOMReferences(parseResult.api, {
      parse: { mediaType },
      resolve: { baseURI },
    });
    const refract = dehydrate(dereferenced, namespace);

    return JSON.stringify(refract, undefined, 2);
  },

  humanizeDereferenced(dereferenced, { source, mediaType }) {
    const namespace = parser.findNamespace(source, { mediaType });
    const element = from(dereferenced, namespace);
    const pojo = toValue(element, namespace);

    return JSON.stringify(pojo, undefined, 2);
  },
};

Comlink.expose(service, globalThis); // eslint-disable-line no-undef
/* eslint-enable */
