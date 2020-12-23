import { assert } from 'chai';
import fs from 'fs';
import path from 'path';
import { ParseResultElement } from 'apidom';
// @ts-ignore
import * as adapter from 'apidom-parser-adapter-openapi-json-3-1';

import { Reference as IReference, ReferenceSet as IReferenceSet } from '../../../../src/types';
import * as url from '../../../../src/util/url';
import resolve from '../../../../src/strategies/openapi-3-1/resolve/resolve-reference-objects';

describe('strategies', function () {
  context('openapi-3-1', function () {
    context('resolve', function () {
      context('resolve-reference-objects', function () {
        context('given parsed OpenApi 3.1.x document with single external reference', function () {
          let parseResult: ParseResultElement;
          const rootPath = path.join(
            __dirname,
            'fixtures',
            'single-external-reference',
            'root.json',
          );
          const ex1Path = url.resolve(rootPath, 'ex1.json');
          let rootData: string;
          let refSet: IReferenceSet;

          beforeEach(async function () {
            rootData = fs.readFileSync(rootPath).toString();
            parseResult = await adapter.parse(rootData);
            refSet = await resolve(parseResult, { resolve: { baseURI: rootPath } });
          });

          specify('should have 2 references in reference set', async function () {
            assert.strictEqual(refSet.size, 2);
          });

          specify('should have root reference set to baseURI', async function () {
            const { rootRef } = refSet;

            assert.strictEqual(rootRef.uri, rootPath);
          });

          context('given 1st reference', function () {
            let firstReference: IReference;

            beforeEach(function () {
              [firstReference] = Array.from(refSet.values());
            });

            specify('should be identical as root reference', async function () {
              const { rootRef } = refSet;

              assert.strictEqual(firstReference, rootRef);
            });

            specify('should have expected resolved value', async function () {
              assert.isTrue(firstReference.value.first?.equals(JSON.parse(rootData)));
            });
          });

          context('given 2nd reference', function () {
            let secondReference: IReference;

            beforeEach(function () {
              [, secondReference] = Array.from(refSet.values());
            });

            specify('should have expected URI', async function () {
              assert.strictEqual(secondReference.uri, ex1Path);
            });

            specify('should have expected resolved value', async function () {
              const ex1Data = JSON.parse(fs.readFileSync(ex1Path).toString());

              assert.isTrue(secondReference.value.first?.equals(ex1Data));
            });
          });
        });

        context('given parsed OpenApi 3.1.x document with no external reference', function () {
          const rootPath = path.join(__dirname, 'fixtures', 'no-external-reference', 'root.json');
          let rootData: string;
          let refSet: IReferenceSet;
          let parseResult: ParseResultElement;

          beforeEach(async function () {
            rootData = fs.readFileSync(rootPath).toString();
            parseResult = await adapter.parse(rootData);
            refSet = await resolve(parseResult, { resolve: { baseURI: rootPath } });
          });

          specify('should have 1 reference in reference set', async function () {
            assert.strictEqual(refSet.size, 1);
          });

          specify('should have root reference set to baseURI', async function () {
            const { rootRef } = refSet;

            assert.strictEqual(rootRef.uri, rootPath);
          });

          context('given 1st reference', function () {
            let firstReference: IReference;

            beforeEach(function () {
              [firstReference] = Array.from(refSet.values());
            });

            specify('should be identical as root reference', async function () {
              const { rootRef } = refSet;

              assert.strictEqual(firstReference, rootRef);
            });

            specify('should have expected resolved value', async function () {
              assert.isTrue(firstReference.value.first?.equals(JSON.parse(rootData)));
            });
          });
        });

        context(
          'given parsed OpenApi 3.1.x document with depth 4 external references',
          function () {
            const rootPath = path.join(
              __dirname,
              'fixtures',
              'external-reference-depth-4',
              'root.json',
            );
            const ex1Path = url.resolve(rootPath, 'ex1.json');
            const ex2Path = url.resolve(rootPath, 'ex2.json');
            const ex3Path = url.resolve(rootPath, 'ex3.json');
            let parseResult: ParseResultElement;
            let rootData: string;
            let refSet: IReferenceSet;

            beforeEach(async function () {
              rootData = fs.readFileSync(rootPath).toString();
              parseResult = await adapter.parse(rootData);
              refSet = await resolve(parseResult, { resolve: { baseURI: rootPath } });
            });

            specify('should have 4 references in reference set', async function () {
              assert.strictEqual(refSet.size, 4);
            });

            specify('should have root reference set to baseURI', async function () {
              const { rootRef } = refSet;

              assert.strictEqual(rootRef.uri, rootPath);
            });

            context('given depth 0 reference', function () {
              let depth0Reference: IReference;

              beforeEach(function () {
                [depth0Reference] = Array.from(refSet.values());
              });

              specify('should be identical as root reference', async function () {
                const { rootRef } = refSet;

                assert.strictEqual(depth0Reference, rootRef);
              });

              specify('should have expected resolved value', async function () {
                assert.isTrue(depth0Reference.value.first?.equals(JSON.parse(rootData)));
              });
            });

            context('given depth 1 reference', function () {
              let depth1Reference: IReference;

              beforeEach(async function () {
                [, depth1Reference] = Array.from(refSet.values());
              });

              specify('should have expected URI', async function () {
                assert.strictEqual(depth1Reference.uri, ex1Path);
              });

              specify('should have expected resolved value', async function () {
                const ex1Data = JSON.parse(fs.readFileSync(ex1Path).toString());

                assert.isTrue(depth1Reference.value.first?.equals(ex1Data));
              });
            });

            context('given depth 2 reference', function () {
              let depth2Reference: IReference;

              beforeEach(async function () {
                [, , depth2Reference] = Array.from(refSet.values());
              });

              specify('should have expected URI', async function () {
                assert.strictEqual(depth2Reference.uri, ex2Path);
              });

              specify('should have expected resolved value', async function () {
                const ex2Data = JSON.parse(fs.readFileSync(ex2Path).toString());

                assert.isTrue(depth2Reference.value.first?.equals(ex2Data));
              });
            });

            context('given depth 3 reference', function () {
              let depth3Reference: IReference;

              beforeEach(async function () {
                [, , , depth3Reference] = Array.from(refSet.values());
              });

              specify('should have expected URI', async function () {
                assert.strictEqual(depth3Reference.uri, ex3Path);
              });

              specify('should have expected resolved value', async function () {
                const ex3Data = JSON.parse(fs.readFileSync(ex3Path).toString());

                assert.isTrue(depth3Reference.value.first?.equals(ex3Data));
              });
            });
          },
        );

        context(
          'given parsed OpenApi 3.1.x document with depth 4 nested external references',
          function () {
            const rootPath = path.join(
              __dirname,
              'fixtures',
              'nested-external-reference-depth-4',
              'root.json',
            );
            const ex1Path = url.resolve(rootPath, 'nesting1/ex1.json');
            const ex2Path = url.resolve(rootPath, 'nesting1/nesting2/ex2.json');
            const ex3Path = url.resolve(rootPath, 'ex3.json');
            let parseResult: ParseResultElement;
            let rootData: string;
            let refSet: IReferenceSet;

            beforeEach(async function () {
              rootData = fs.readFileSync(rootPath).toString();
              parseResult = await adapter.parse(rootData);
              refSet = await resolve(parseResult, { resolve: { baseURI: rootPath } });
            });

            specify('should have 4 references in reference set', async function () {
              assert.strictEqual(refSet.size, 4);
            });

            specify('should have root reference set to baseURI', async function () {
              const { rootRef } = refSet;

              assert.strictEqual(rootRef.uri, rootPath);
            });

            context('given depth 0 reference', function () {
              let depth0Reference: IReference;

              beforeEach(function () {
                [depth0Reference] = Array.from(refSet.values());
              });

              specify('should be identical as root reference', async function () {
                const { rootRef } = refSet;

                assert.strictEqual(depth0Reference, rootRef);
              });

              specify('should have expected resolved value', async function () {
                assert.isTrue(depth0Reference.value.first?.equals(JSON.parse(rootData)));
              });
            });

            context('given depth 1 reference', function () {
              let depth1Reference: IReference;

              beforeEach(async function () {
                [, depth1Reference] = Array.from(refSet.values());
              });

              specify('should have expected URI', async function () {
                assert.strictEqual(depth1Reference.uri, ex1Path);
              });

              specify('should have expected resolved value', async function () {
                const ex1Data = JSON.parse(fs.readFileSync(ex1Path).toString());

                assert.isTrue(depth1Reference.value.first?.equals(ex1Data));
              });
            });

            context('given depth 2 reference', function () {
              let depth2Reference: IReference;

              beforeEach(async function () {
                [, , depth2Reference] = Array.from(refSet.values());
              });

              specify('should have expected URI', async function () {
                assert.strictEqual(depth2Reference.uri, ex2Path);
              });

              specify('should have expected resolved value', async function () {
                const ex2Data = JSON.parse(fs.readFileSync(ex2Path).toString());

                assert.isTrue(depth2Reference.value.first?.equals(ex2Data));
              });
            });

            context('given depth 3 reference', function () {
              let depth3Reference: IReference;

              beforeEach(async function () {
                [, , , depth3Reference] = Array.from(refSet.values());
              });

              specify('should have expected URI', async function () {
                assert.strictEqual(depth3Reference.uri, ex3Path);
              });

              specify('should have expected resolved value', async function () {
                const ex3Data = JSON.parse(fs.readFileSync(ex3Path).toString());

                assert.isTrue(depth3Reference.value.first?.equals(ex3Data));
              });
            });
          },
        );
      });
    });
  });
});
