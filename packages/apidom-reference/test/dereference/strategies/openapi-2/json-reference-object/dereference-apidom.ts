import path from 'node:path';
import { assert } from 'chai';
import { mediaTypes, isSchemaElement, ReferenceElement } from '@swagger-api/apidom-ns-openapi-2';
import { toValue } from '@swagger-api/apidom-core';
import { evaluate } from '@swagger-api/apidom-json-pointer/modern';
import { fileURLToPath } from 'node:url';

import { parse, dereferenceApiDOM } from '../../../../../src/index.ts';
import { ServerTerminable, createHTTPServer } from '../../../../helpers.ts';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

describe('dereference', function () {
  context('strategies', function () {
    context('openapi-2', function () {
      context('JSONReference Object', function () {
        context(
          'given single JSONReferenceElement passed to dereferenceApiDOM with internal references',
          function () {
            context('given dereferencing using local file system', function () {
              const fixturePath = path.join(__dirname, 'fixtures', 'internal-only', 'entry.json');

              specify('should dereference', async function () {
                const parseResult = await parse(fixturePath, {
                  parse: { mediaType: mediaTypes.latest('json') },
                });
                const referenceElement = evaluate<ReferenceElement>(
                  parseResult.api,
                  '/definitions/schema1',
                );
                const dereferenced = await dereferenceApiDOM(referenceElement, {
                  parse: { mediaType: mediaTypes.latest('json') },
                  resolve: {
                    baseURI: `${fixturePath}#/definitions/schema1`,
                  },
                });

                assert.isTrue(isSchemaElement(dereferenced));
              });

              specify('should dereference and contain metadata about origin', async function () {
                const parseResult = await parse(fixturePath, {
                  parse: { mediaType: mediaTypes.latest('json') },
                });
                const referenceElement = evaluate<ReferenceElement>(
                  parseResult.api,
                  '/definitions/schema1',
                );
                const dereferenced = await dereferenceApiDOM(referenceElement, {
                  parse: { mediaType: mediaTypes.latest('json') },
                  resolve: { baseURI: `${fixturePath}#/definitions/schema1` },
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
                  '/definitions/schema1',
                );
                const dereferenced = await dereferenceApiDOM(referenceElement, {
                  parse: { mediaType: mediaTypes.latest('json') },
                  resolve: {
                    baseURI: `http://localhost:${httpPort}/entry.json#/definitions/schema1`,
                  },
                });

                assert.isTrue(isSchemaElement(dereferenced));
              });

              specify('should dereference and contain metadata about origin', async function () {
                const parseResult = await parse(fixturePath, {
                  parse: { mediaType: mediaTypes.latest('json') },
                });
                const referenceElement = evaluate<ReferenceElement>(
                  parseResult.api,
                  '/definitions/schema1',
                );
                const dereferenced = await dereferenceApiDOM(referenceElement, {
                  parse: { mediaType: mediaTypes.latest('json') },
                  resolve: {
                    baseURI: `http://localhost:${httpPort}/entry.json#/definitions/schema1`,
                  },
                });

                assert.match(toValue(dereferenced.meta.get('ref-origin')), /\/entry\.json$/);
              });
            });
          },
        );

        context(
          'given single JSONReferenceElement passed to dereferenceApiDOM with external references',
          function () {
            context('given dereferencing using local file system', function () {
              const fixturePath = path.join(__dirname, 'fixtures', 'external-only', 'entry.json');

              specify('should dereference', async function () {
                const parseResult = await parse(fixturePath, {
                  parse: { mediaType: mediaTypes.latest('json') },
                });
                const referenceElement = evaluate<ReferenceElement>(
                  parseResult.api,
                  '/definitions/schema',
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
                  '/definitions/schema',
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
                  '/definitions/schema',
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
                  '/definitions/schema',
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
                  '/definitions/schema',
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
                  '/definitions/schema',
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
