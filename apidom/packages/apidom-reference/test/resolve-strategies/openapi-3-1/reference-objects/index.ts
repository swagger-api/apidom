import { assert } from 'chai';
import path from 'path';
import fs from 'fs';

import File from '../../../../src/util/File';
import ReferenceObjectsResolveStrategy from '../../../../src/resolve-strategies/openapi-3-1/reference-objects';
import { parse } from '../../../../src';
import defaultOptions from '../../../../src/options';
import * as url from '../../../../src/util/url';
import {
  File as IFile,
  ReferenceSet as IReferenceSet,
  Reference as IReference,
} from '../../../../src/types';

describe('resolve-strategies', function () {
  context('openapi-3-1', function () {
    context('reference-objects', function () {
      const strategy = ReferenceObjectsResolveStrategy();

      context('canResolve', function () {
        context('given proper media type', function () {
          specify('should return true', function () {
            const file1 = File({
              uri: '/path/to/file.yaml',
              mediaType: 'application/vnd.oai.openapi;version=3.1.0',
            });
            const file2 = File({
              uri: '/path/to/file.yaml',
              mediaType: 'application/vnd.oai.openapi+json;version=3.1.0',
            });

            assert.isTrue(strategy.canResolve(file1));
            assert.isTrue(strategy.canResolve(file2));
          });
        });

        context('given unknown media type', function () {
          specify('should return false', function () {
            const file = File({
              uri: '/path/to/file.json',
              mediaType: 'application/json',
            });

            assert.isFalse(strategy.canResolve(file));
          });
        });
      });

      context('resolve', function () {
        context('given OpenApi 3.1.x document with single external reference', function () {
          let rootFile: IFile;
          let refSet: IReferenceSet;

          beforeEach(async function () {
            const uri = path.join(__dirname, 'fixtures', 'single-external-reference', 'root.json');
            const mediaType = 'application/vnd.oai.openapi;version=3.1.0';
            const data = fs.readFileSync(uri);
            const parseResult = await parse(uri, { parse: { mediaType } });

            rootFile = File({ uri, mediaType, data, parseResult });
            refSet = await strategy.resolve(rootFile, defaultOptions);
          });

          specify('should have 2 references in reference set', async function () {
            assert.strictEqual(refSet.size, 2);
          });

          specify('should have root reference set to baseURI', async function () {
            const { rootRef } = refSet;

            assert.strictEqual(rootRef.uri, rootFile.uri);
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
              assert.isTrue(
                firstReference.value.first?.equals(JSON.parse(rootFile.data.toString())),
              );
            });
          });

          context('given 2nd reference', function () {
            let secondReference: IReference;
            let ex1File: IFile;

            beforeEach(function () {
              const uri = url.resolve(rootFile.uri, 'ex1.json');
              const data = fs.readFileSync(uri);

              ex1File = File({ uri, data });
              [, secondReference] = Array.from(refSet.values());
            });

            specify('should have expected URI', async function () {
              assert.strictEqual(secondReference.uri, ex1File.uri);
            });

            specify('should have expected resolved value', async function () {
              const ex1Data = JSON.parse(ex1File.data.toString());

              assert.isTrue(secondReference.value.first?.equals(ex1Data));
            });
          });
        });

        context('given OpenApi 3.1.x document with no external reference', function () {
          let rootFile: IFile;
          let refSet: IReferenceSet;

          beforeEach(async function () {
            const uri = path.join(__dirname, 'fixtures', 'no-external-reference', 'root.json');
            const mediaType = 'application/vnd.oai.openapi;version=3.1.0';
            const data = fs.readFileSync(uri);
            const parseResult = await parse(uri, { parse: { mediaType } });

            rootFile = File({ uri, mediaType, data, parseResult });
            refSet = await strategy.resolve(rootFile, defaultOptions);
          });

          specify('should have 1 reference in reference set', async function () {
            assert.strictEqual(refSet.size, 1);
          });

          specify('should have root reference set to baseURI', async function () {
            const { rootRef } = refSet;

            assert.strictEqual(rootRef.uri, rootFile.uri);
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
              assert.isTrue(
                firstReference.value.first?.equals(JSON.parse(rootFile.data.toString())),
              );
            });
          });
        });

        context('given OpenApi 3.1.x document with depth 4 external references', function () {
          let rootFile: IFile;
          let refSet: IReferenceSet;

          beforeEach(async function () {
            const uri = path.join(__dirname, 'fixtures', 'external-reference-depth-4', 'root.json');
            const mediaType = 'application/vnd.oai.openapi;version=3.1.0';
            const data = fs.readFileSync(uri);
            const parseResult = await parse(uri, { parse: { mediaType } });

            rootFile = File({ uri, mediaType, data, parseResult });
            refSet = await strategy.resolve(rootFile, defaultOptions);
          });

          specify('should have 4 references in reference set', async function () {
            assert.strictEqual(refSet.size, 4);
          });

          specify('should have root reference set to baseURI', async function () {
            const { rootRef } = refSet;

            assert.strictEqual(rootRef.uri, rootFile.uri);
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
              assert.isTrue(
                depth0Reference.value.first?.equals(JSON.parse(rootFile.data.toString())),
              );
            });
          });

          context('given depth 1 reference', function () {
            let depth1Reference: IReference;
            let ex1File: IFile;

            beforeEach(async function () {
              const uri = url.resolve(rootFile.uri, 'ex1.json');
              const data = fs.readFileSync(uri);

              ex1File = File({ uri, data });
              [, depth1Reference] = Array.from(refSet.values());
            });

            specify('should have expected URI', async function () {
              assert.strictEqual(depth1Reference.uri, ex1File.uri);
            });

            specify('should have expected resolved value', async function () {
              const ex1Data = JSON.parse(ex1File.data.toString());

              assert.isTrue(depth1Reference.value.first?.equals(ex1Data));
            });
          });

          context('given depth 2 reference', function () {
            let depth2Reference: IReference;
            let ex2File: IFile;

            beforeEach(async function () {
              const uri = url.resolve(rootFile.uri, 'ex2.json');
              const data = fs.readFileSync(uri);

              ex2File = File({ uri, data });
              [, , depth2Reference] = Array.from(refSet.values());
            });

            specify('should have expected URI', async function () {
              assert.strictEqual(depth2Reference.uri, ex2File.uri);
            });

            specify('should have expected resolved value', async function () {
              const ex2Data = JSON.parse(ex2File.data.toString());

              assert.isTrue(depth2Reference.value.first?.equals(ex2Data));
            });
          });

          context('given depth 3 reference', function () {
            let depth3Reference: IReference;
            let ex3File: IFile;

            beforeEach(async function () {
              const uri = url.resolve(rootFile.uri, 'ex3.json');
              const data = fs.readFileSync(uri);

              ex3File = File({ uri, data });
              [, , , depth3Reference] = Array.from(refSet.values());
            });

            specify('should have expected URI', async function () {
              assert.strictEqual(depth3Reference.uri, ex3File.uri);
            });

            specify('should have expected resolved value', async function () {
              const ex3Data = JSON.parse(ex3File.data.toString());

              assert.isTrue(depth3Reference.value.first?.equals(ex3Data));
            });
          });
        });

        context(
          'given OpenApi 3.1.x document with depth 4 nested external references',
          function () {
            let rootFile: IFile;
            let refSet: IReferenceSet;

            beforeEach(async function () {
              const uri = path.join(
                __dirname,
                'fixtures',
                'nested-external-reference-depth-4',
                'root.json',
              );
              const mediaType = 'application/vnd.oai.openapi;version=3.1.0';
              const data = fs.readFileSync(uri);
              const parseResult = await parse(uri, { parse: { mediaType } });

              rootFile = File({ uri, mediaType, data, parseResult });
              refSet = await strategy.resolve(rootFile, defaultOptions);
            });

            specify('should have 4 references in reference set', async function () {
              assert.strictEqual(refSet.size, 4);
            });

            specify('should have root reference set to baseURI', async function () {
              const { rootRef } = refSet;

              assert.strictEqual(rootRef.uri, rootFile.uri);
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
                assert.isTrue(
                  depth0Reference.value.first?.equals(JSON.parse(rootFile.data.toString())),
                );
              });
            });

            context('given depth 1 reference', function () {
              let depth1Reference: IReference;
              let ex1File: IFile;

              beforeEach(async function () {
                const uri = url.resolve(rootFile.uri, path.join('nesting1', 'ex1.json'));
                const data = fs.readFileSync(uri);

                ex1File = File({ uri, data });
                [, depth1Reference] = Array.from(refSet.values());
              });

              specify('should have expected URI', async function () {
                assert.strictEqual(depth1Reference.uri, ex1File.uri);
              });

              specify('should have expected resolved value', async function () {
                const ex1Data = JSON.parse(ex1File.data.toString());

                assert.isTrue(depth1Reference.value.first?.equals(ex1Data));
              });
            });

            context('given depth 2 reference', function () {
              let depth2Reference: IReference;
              let ex2File: IFile;

              beforeEach(async function () {
                const uri = url.resolve(
                  rootFile.uri,
                  path.join('nesting1', 'nesting2', 'ex2.json'),
                );
                const data = fs.readFileSync(uri);

                ex2File = File({ uri, data });
                [, , depth2Reference] = Array.from(refSet.values());
              });

              specify('should have expected URI', async function () {
                assert.strictEqual(depth2Reference.uri, ex2File.uri);
              });

              specify('should have expected resolved value', async function () {
                const ex2Data = JSON.parse(ex2File.data.toString());

                assert.isTrue(depth2Reference.value.first?.equals(ex2Data));
              });
            });

            context('given depth 3 reference', function () {
              let depth3Reference: IReference;
              let ex3File: IFile;

              beforeEach(async function () {
                const uri = url.resolve(rootFile.uri, 'ex3.json');
                const data = fs.readFileSync(uri);

                ex3File = File({ uri, data });
                [, , , depth3Reference] = Array.from(refSet.values());
              });

              specify('should have expected URI', async function () {
                assert.strictEqual(depth3Reference.uri, ex3File.uri);
              });

              specify('should have expected resolved value', async function () {
                const ex3Data = JSON.parse(ex3File.data.toString());

                assert.isTrue(depth3Reference.value.first?.equals(ex3Data));
              });
            });
          },
        );
      });
    });
  });
});
