import path from 'node:path';
import { assert } from 'chai';
import { mediaTypes, isParameterElement, SwaggerElement } from '@swagger-api/apidom-ns-openapi-2';
import { toValue } from '@swagger-api/apidom-core';
import { evaluate } from '@swagger-api/apidom-json-pointer';

import { parse, dereferenceApiDOM } from '../../../../../src';
import { ServerTerminable, createHTTPServer } from '../../../../helpers';

describe('dereference', function () {
  context('strategies', function () {
    context('openapi-2', function () {
      context('Reference Object', function () {
        context(
          'given single ReferenceElement passed to dereferenceApiDOM with internal references',
          function () {
            context('given dereferencing using local file system', function () {
              const fixturePath = path.join(__dirname, 'fixtures', 'internal-only', 'root.json');

              specify('should dereference', async function () {
                const parseResult = await parse(fixturePath, {
                  parse: { mediaType: mediaTypes.latest('json') },
                });
                const referenceElement = evaluate(
                  '/paths/~1/parameters/0',
                  parseResult.api as SwaggerElement,
                );
                const dereferenced = await dereferenceApiDOM(referenceElement, {
                  parse: { mediaType: mediaTypes.latest('json') },
                  resolve: {
                    baseURI: `${fixturePath}#/paths/~1/parameters/0`,
                  },
                });

                assert.isTrue(isParameterElement(dereferenced));
              });

              specify('should dereference and contain metadata about origin', async function () {
                const parseResult = await parse(fixturePath, {
                  parse: { mediaType: mediaTypes.latest('json') },
                });
                const referenceElement = evaluate(
                  '/paths/~1/parameters/0',
                  parseResult.api as SwaggerElement,
                );
                const dereferenced = await dereferenceApiDOM(referenceElement, {
                  parse: { mediaType: mediaTypes.latest('json') },
                  resolve: { baseURI: `${fixturePath}#/paths/~1/parameters/0` },
                });

                assert.match(
                  toValue(dereferenced.meta.get('ref-origin')),
                  /internal-only\/root\.json$/,
                );
              });
            });

            context('given dereferencing using HTTP protocol', function () {
              const fixturePath = path.join(__dirname, 'fixtures', 'internal-only', 'root.json');
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
                const referenceElement = evaluate(
                  '/paths/~1/parameters/0',
                  parseResult.api as SwaggerElement,
                );
                const dereferenced = await dereferenceApiDOM(referenceElement, {
                  parse: { mediaType: mediaTypes.latest('json') },
                  resolve: {
                    baseURI: `http://localhost:${httpPort}/root.json#/paths/~1/parameters/0`,
                  },
                });

                assert.isTrue(isParameterElement(dereferenced));
              });

              specify('should dereference and contain metadata about origin', async function () {
                const parseResult = await parse(fixturePath, {
                  parse: { mediaType: mediaTypes.latest('json') },
                });
                const referenceElement = evaluate(
                  '/paths/~1/parameters/0',
                  parseResult.api as SwaggerElement,
                );
                const dereferenced = await dereferenceApiDOM(referenceElement, {
                  parse: { mediaType: mediaTypes.latest('json') },
                  resolve: {
                    baseURI: `http://localhost:${httpPort}/root.json#/paths/~1/parameters/0`,
                  },
                });

                assert.match(toValue(dereferenced.meta.get('ref-origin')), /\/root\.json$/);
              });
            });
          },
        );

        context(
          'given single ReferenceElement passed to dereferenceApiDOM with external references',
          function () {
            context('given dereferencing using local file system', function () {
              const fixturePath = path.join(__dirname, 'fixtures', 'external-only', 'root.json');

              specify('should dereference', async function () {
                const parseResult = await parse(fixturePath, {
                  parse: { mediaType: mediaTypes.latest('json') },
                });
                const referenceElement = evaluate(
                  '/paths/~1/parameters/0',
                  parseResult.api as SwaggerElement,
                );
                const dereferenced = await dereferenceApiDOM(referenceElement, {
                  parse: { mediaType: mediaTypes.latest('json') },
                  resolve: { baseURI: fixturePath },
                });

                assert.isTrue(isParameterElement(dereferenced));
              });

              specify('should dereference and contain metadata about origin', async function () {
                const parseResult = await parse(fixturePath, {
                  parse: { mediaType: mediaTypes.latest('json') },
                });
                const referenceElement = evaluate(
                  '/paths/~1/parameters/0',
                  parseResult.api as SwaggerElement,
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
              const fixturePath = path.join(__dirname, 'fixtures', 'external-only', 'root.json');
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
                const referenceElement = evaluate(
                  '/paths/~1/parameters/0',
                  parseResult.api as SwaggerElement,
                );
                const dereferenced = await dereferenceApiDOM(referenceElement, {
                  parse: { mediaType: mediaTypes.latest('json') },
                  resolve: { baseURI: `http://localhost:${httpPort}/root.json` },
                });

                assert.isTrue(isParameterElement(dereferenced));
              });

              specify('should dereference and contain metadata about origin', async function () {
                const parseResult = await parse(fixturePath, {
                  parse: { mediaType: mediaTypes.latest('json') },
                });
                const referenceElement = evaluate(
                  '/paths/~1/parameters/0',
                  parseResult.api as SwaggerElement,
                );
                const dereferenced = await dereferenceApiDOM(referenceElement, {
                  parse: { mediaType: mediaTypes.latest('json') },
                  resolve: { baseURI: `http://localhost:${httpPort}/root.json` },
                });

                assert.match(toValue(dereferenced.meta.get('ref-origin')), /\/ex\.json$/);
              });
            });

            context('given dereferencing using HTTP protocol and absolute URLs', function () {
              const fixturePath = path.join(
                __dirname,
                'fixtures',
                'external-only-absolute-url',
                'root.json',
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
                const referenceElement = evaluate(
                  '/paths/~1/parameters/0',
                  parseResult.api as SwaggerElement,
                );
                const dereferenced = await dereferenceApiDOM(referenceElement, {
                  parse: { mediaType: mediaTypes.latest('json') },
                  resolve: { baseURI: `http://localhost:${httpPort}/root.json` },
                });

                assert.isTrue(isParameterElement(dereferenced));
              });

              specify('should dereference and contain metadata about origin', async function () {
                const parseResult = await parse(fixturePath, {
                  parse: { mediaType: mediaTypes.latest('json') },
                });
                const referenceElement = evaluate(
                  '/paths/~1/parameters/0',
                  parseResult.api as SwaggerElement,
                );
                const dereferenced = await dereferenceApiDOM(referenceElement, {
                  parse: { mediaType: mediaTypes.latest('json') },
                  resolve: { baseURI: `http://localhost:${httpPort}/root.json` },
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
