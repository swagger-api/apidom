import path from 'node:path';
import { assert } from 'chai';
import {
  mediaTypes,
  isParameterElement,
  isSchemaElement,
  ReferenceElement,
} from '@swagger-api/apidom-ns-openapi-3-0';
import { toValue } from '@swagger-api/apidom-core';
import { evaluate } from '@swagger-api/apidom-json-pointer/modern';
import { fileURLToPath } from 'node:url';

import { parse, dereferenceApiDOM } from '../../../../../src/index.ts';
import { ServerTerminable, createHTTPServer } from '../../../../helpers.ts';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

describe('dereference', function () {
  context('strategies', function () {
    context('openapi-3-0', function () {
      context('Reference Object', function () {
        context(
          'given single ReferenceElement passed to dereferenceApiDOM with internal references',
          function () {
            context('given dereferencing using local file system', function () {
              const fixturePath = path.join(__dirname, 'fixtures', 'internal-only', 'entry.json');

              specify('should dereference', async function () {
                const parseResult = await parse(fixturePath, {
                  parse: { mediaType: mediaTypes.latest('json') },
                });
                const referenceElement = evaluate<ReferenceElement>(
                  parseResult.api,
                  '/components/parameters/userId',
                );
                const dereferenced = await dereferenceApiDOM(referenceElement, {
                  parse: { mediaType: mediaTypes.latest('json') },
                  resolve: {
                    baseURI: `${fixturePath}#/components/parameters/userId`,
                  },
                });

                assert.isTrue(isParameterElement(dereferenced));
              });

              specify('should dereference and contain metadata about origin', async function () {
                const parseResult = await parse(fixturePath, {
                  parse: { mediaType: mediaTypes.latest('json') },
                });
                const referenceElement = evaluate<ReferenceElement>(
                  parseResult.api,
                  '/components/parameters/userId',
                );
                const dereferenced = await dereferenceApiDOM(referenceElement, {
                  parse: { mediaType: mediaTypes.latest('json') },
                  resolve: { baseURI: `${fixturePath}#/components/parameters/userId` },
                });

                assert.match(
                  toValue(dereferenced.meta.get('ref-origin')),
                  /internal-only\/entry\.json$/,
                );
              });
            });

            context('given dereferencing using HTTP protocol', function () {
              const fixturePath = path.join(__dirname, 'fixtures', 'internal-only', 'entry.json');
              const httpPort = 8123;
              let httpServer: ServerTerminable;

              beforeEach(function () {
                const cwd = path.join(__dirname, 'fixtures', 'internal-only');
                httpServer = createHTTPServer({ port: httpPort, cwd });
              });

              afterEach(async function () {
                await httpServer.terminate();
              });

              specify('should dereference', async function () {
                const parseResult = await parse(fixturePath, {
                  parse: { mediaType: mediaTypes.latest('json') },
                });
                const referenceElement = evaluate<ReferenceElement>(
                  parseResult.api,
                  '/components/parameters/userId',
                );
                const dereferenced = await dereferenceApiDOM(referenceElement, {
                  parse: { mediaType: mediaTypes.latest('json') },
                  resolve: {
                    baseURI: `http://localhost:${httpPort}/entry.json#/components/parameters/userId`,
                  },
                });

                assert.isTrue(isParameterElement(dereferenced));
              });

              specify('should dereference and contain metadata about origin', async function () {
                const parseResult = await parse(fixturePath, {
                  parse: { mediaType: mediaTypes.latest('json') },
                });
                const referenceElement = evaluate<ReferenceElement>(
                  parseResult.api,
                  '/components/parameters/userId',
                );
                const dereferenced = await dereferenceApiDOM(referenceElement, {
                  parse: { mediaType: mediaTypes.latest('json') },
                  resolve: {
                    baseURI: `http://localhost:${httpPort}/entry.json#/components/parameters/userId`,
                  },
                });

                assert.match(toValue(dereferenced.meta.get('ref-origin')), /\/entry\.json$/);
              });
            });
          },
        );

        context(
          'given single ReferenceElement passed to dereferenceApiDOM with external references',
          function () {
            context('given dereferencing using local file system', function () {
              const fixturePath = path.join(__dirname, 'fixtures', 'external-only', 'entry.json');

              specify('should dereference', async function () {
                const parseResult = await parse(fixturePath, {
                  parse: { mediaType: mediaTypes.latest('json') },
                });
                const referenceElement = <ReferenceElement>(
                  evaluate(parseResult.api, '/components/schemas/externalSchema')
                );
                const dereferenced = await dereferenceApiDOM(referenceElement, {
                  parse: { mediaType: mediaTypes.latest('json') },
                  resolve: { baseURI: fixturePath },
                });

                assert.isTrue(isSchemaElement(dereferenced));
              });

              specify('should dereference and contain metadata about origin', async function () {
                const parseResult = await parse(fixturePath, {
                  parse: { mediaType: mediaTypes.latest('json') },
                });
                const referenceElement = evaluate<ReferenceElement>(
                  parseResult.api,
                  '/components/schemas/externalSchema',
                );
                const dereferenced = await dereferenceApiDOM(referenceElement, {
                  parse: { mediaType: mediaTypes.latest('json') },
                  resolve: { baseURI: fixturePath },
                });

                assert.match(
                  toValue(dereferenced.meta.get('ref-origin')),
                  /external-only\/ex\.json$/,
                );
              });
            });

            context('given dereferencing using HTTP protocol', function () {
              const fixturePath = path.join(__dirname, 'fixtures', 'external-only', 'entry.json');
              const httpPort = 8123;
              let httpServer: ServerTerminable;

              beforeEach(function () {
                const cwd = path.join(__dirname, 'fixtures', 'external-only');
                httpServer = createHTTPServer({ port: httpPort, cwd });
              });

              afterEach(async function () {
                await httpServer.terminate();
              });

              specify('should dereference', async function () {
                const parseResult = await parse(fixturePath, {
                  parse: { mediaType: mediaTypes.latest('json') },
                });
                const referenceElement = evaluate<ReferenceElement>(
                  parseResult.api,
                  '/components/schemas/externalSchema',
                );
                const dereferenced = await dereferenceApiDOM(referenceElement, {
                  parse: { mediaType: mediaTypes.latest('json') },
                  resolve: { baseURI: `http://localhost:${httpPort}/entry.json` },
                });

                assert.isTrue(isSchemaElement(dereferenced));
              });

              specify('should dereference and contain metadata about origin', async function () {
                const parseResult = await parse(fixturePath, {
                  parse: { mediaType: mediaTypes.latest('json') },
                });
                const referenceElement = evaluate<ReferenceElement>(
                  parseResult.api,
                  '/components/schemas/externalSchema',
                );
                const dereferenced = await dereferenceApiDOM(referenceElement, {
                  parse: { mediaType: mediaTypes.latest('json') },
                  resolve: { baseURI: `http://localhost:${httpPort}/entry.json` },
                });

                assert.match(toValue(dereferenced.meta.get('ref-origin')), /\/ex\.json$/);
              });
            });

            context('given dereferencing using HTTP protocol and absolute URLs', function () {
              const fixturePath = path.join(
                __dirname,
                'fixtures',
                'external-only-absolute-url',
                'entry.json',
              );
              const httpPort = 8123;
              let httpServer: ServerTerminable;

              beforeEach(function () {
                const cwd = path.join(__dirname, 'fixtures', 'external-only-absolute-url');
                httpServer = createHTTPServer({ port: httpPort, cwd });
              });

              afterEach(async function () {
                await httpServer.terminate();
              });

              specify('should dereference', async function () {
                const parseResult = await parse(fixturePath, {
                  parse: { mediaType: mediaTypes.latest('json') },
                });
                const referenceElement = evaluate<ReferenceElement>(
                  parseResult.api,
                  '/components/parameters/externalRef',
                );
                const dereferenced = await dereferenceApiDOM(referenceElement, {
                  parse: { mediaType: mediaTypes.latest('json') },
                  resolve: { baseURI: `http://localhost:${httpPort}/entry.json` },
                });

                assert.isTrue(isParameterElement(dereferenced));
              });

              specify('should dereference and contain metadata about origin', async function () {
                const parseResult = await parse(fixturePath, {
                  parse: { mediaType: mediaTypes.latest('json') },
                });
                const referenceElement = evaluate<ReferenceElement>(
                  parseResult.api,
                  '/components/parameters/externalRef',
                );
                const dereferenced = await dereferenceApiDOM(referenceElement, {
                  parse: { mediaType: mediaTypes.latest('json') },
                  resolve: { baseURI: `http://localhost:${httpPort}/entry.json` },
                });

                assert.match(toValue(dereferenced.meta.get('ref-origin')), /\/ex\.json$/);
              });
            });
          },
        );
      });
    });
  });
});
