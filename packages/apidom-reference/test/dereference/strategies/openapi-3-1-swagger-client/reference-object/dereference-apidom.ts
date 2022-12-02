import path from 'node:path';
import { assert } from 'chai';
import {
  mediaTypes,
  isParameterElement,
  OpenApi3_1Element,
} from '@swagger-api/apidom-ns-openapi-3-1';
import { evaluate } from '@swagger-api/apidom-json-pointer';

import { parse, dereferenceApiDOM } from '../../../../../src';
import { ServerTerminable, createHTTPServer } from '../../../../helpers';
import * as bootstrap from '../bootstrap';

describe('dereference', function () {
  before(function () {
    bootstrap.before();
  });

  after(function () {
    bootstrap.after();
  });

  context('strategies', function () {
    context('openapi-3-1swagger-client', function () {
      context('Reference Object', function () {
        context('given single ReferenceElement passed to dereferenceApiDOM', function () {
          context('given dereferencing using local file system', function () {
            const fixturePath = path.join(__dirname, 'fixtures', 'external-only', 'root.json');

            specify('should dereference', async function () {
              const parseResult = await parse(fixturePath, {
                parse: { mediaType: mediaTypes.latest('json') },
              });
              const referenceElement = evaluate(
                '/components/parameters/externalRef',
                parseResult.api as OpenApi3_1Element,
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
                '/components/parameters/externalRef',
                parseResult.api as OpenApi3_1Element,
              );
              const dereferenced = await dereferenceApiDOM(referenceElement, {
                parse: { mediaType: mediaTypes.latest('json') },
                resolve: { baseURI: fixturePath },
              });

              assert.match(
                dereferenced.meta.get('ref-origin').toValue(),
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
                '/components/parameters/externalRef',
                parseResult.api as OpenApi3_1Element,
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
                '/components/parameters/externalRef',
                parseResult.api as OpenApi3_1Element,
              );
              const dereferenced = await dereferenceApiDOM(referenceElement, {
                parse: { mediaType: mediaTypes.latest('json') },
                resolve: { baseURI: `http://localhost:${httpPort}/root.json` },
              });

              assert.match(dereferenced.meta.get('ref-origin').toValue(), /\/ex\.json$/);
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
                '/components/parameters/externalRef',
                parseResult.api as OpenApi3_1Element,
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
                '/components/parameters/externalRef',
                parseResult.api as OpenApi3_1Element,
              );
              const dereferenced = await dereferenceApiDOM(referenceElement, {
                parse: { mediaType: mediaTypes.latest('json') },
                resolve: { baseURI: `http://localhost:${httpPort}/root.json` },
              });

              assert.match(dereferenced.meta.get('ref-origin').toValue(), /\/ex\.json$/);
            });
          });
        });
      });
    });
  });
});
