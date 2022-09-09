import path from 'node:path';
import { assert } from 'chai';
import {
  mediaTypes,
  isParameterElement,
  AsyncApi2Element,
} from '@swagger-api/apidom-ns-asyncapi-2';
import { evaluate } from '@swagger-api/apidom-json-pointer';

import { parse, dereferenceApiDOM } from '../../../../../src';
import { ServerTerminable, createHTTPServer } from '../../../../helpers';

describe('dereference', function () {
  context('strategies', function () {
    context('asyncapi-2', function () {
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
                parseResult.api as AsyncApi2Element,
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
                parseResult.api as AsyncApi2Element,
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
                parseResult.api as AsyncApi2Element,
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
                parseResult.api as AsyncApi2Element,
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
                parseResult.api as AsyncApi2Element,
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
                parseResult.api as AsyncApi2Element,
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
