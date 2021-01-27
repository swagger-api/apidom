import * as fs from 'fs';
import * as path from 'path';
import { assert } from 'chai';

import YamlScalar from '../../../../../src/nodes/yaml/YamlScalar';
import { YamlStyle, YamlStyleGroup } from '../../../../../src/nodes/yaml/YamlStyle';

const plainPath = path.join(__dirname, 'fixtures', 'plain.yaml');
const plainExpectedPath = path.join(__dirname, 'fixtures', 'plain-expected.yaml');

const singleQuotedPath = path.join(__dirname, 'fixtures', 'single-quoted.yaml');
const singleQuotedExceptedPath = path.join(__dirname, 'fixtures', 'single-quoted-expected.yaml');

const doubleQuotedPath = path.join(__dirname, 'fixtures', 'double-quoted.yaml');
const doubleQuotedExceptedPath = path.join(__dirname, 'fixtures', 'double-quoted-expected.yaml');

describe('nodes', function () {
  context('yaml', function () {
    context('YamlScalar', function () {
      context('formats', function () {
        context('formatFlowPlain', function () {
          specify('should format', function () {
            const text = fs.readFileSync(plainPath).toString();
            const scalar = YamlScalar({
              style: YamlStyle.Plain,
              styleGroup: YamlStyleGroup.Flow,
              text,
            });
            const expected = fs.readFileSync(plainExpectedPath).toString().trimRight();

            assert.strictEqual(scalar.content, expected);
          });
        });

        context('formatFlowSingleQuoted', function () {
          specify('should format', function () {
            const text = fs.readFileSync(singleQuotedPath).toString();
            const scalar = YamlScalar({
              style: YamlStyle.SingleQuoted,
              styleGroup: YamlStyleGroup.Flow,
              text,
            });
            const expected = fs.readFileSync(singleQuotedExceptedPath).toString().trimRight();

            assert.strictEqual(scalar.content, expected);
          });
        });

        context('formatFlowDoubleQuoted', function () {
          specify('should format', function () {
            const text = fs.readFileSync(doubleQuotedPath).toString();
            const scalar = YamlScalar({
              style: YamlStyle.DoubleQuoted,
              styleGroup: YamlStyleGroup.Flow,
              text,
            });
            const expected = fs.readFileSync(doubleQuotedExceptedPath).toString().trimRight();
            assert.strictEqual(scalar.content, expected);
          });
        });
      });
    });
  });
});
