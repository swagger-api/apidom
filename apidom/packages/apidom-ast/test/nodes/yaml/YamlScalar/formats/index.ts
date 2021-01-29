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

const literalKeepPath = path.join(__dirname, 'fixtures', 'literal-keep.yaml');
const literalKeepExpectedPath = path.join(__dirname, 'fixtures', 'literal-keep-expected.yaml');

const literalStripPath = path.join(__dirname, 'fixtures', 'literal-strip.yaml');
const literalStripExpectedPath = path.join(__dirname, 'fixtures', 'literal-strip-expected.yaml');

const literalClipPath = path.join(__dirname, 'fixtures', 'literal-clip.yaml');
const literalClipExpectedPath = path.join(__dirname, 'fixtures', 'literal-clip-expected.yaml');

const literalIndentationIndicatorPath = path.join(
  __dirname,
  'fixtures',
  'literal-indentation-indicator.yaml',
);
const literalIndentationIndicatorExpectedPath = path.join(
  __dirname,
  'fixtures',
  'literal-indentation-indicator-expected.yaml',
);

const foldedKeepPath = path.join(__dirname, 'fixtures', 'folded-keep.yaml');
const foldedKeepExpectedPath = path.join(__dirname, 'fixtures', 'folded-keep-expected.yaml');

const foldedStripPath = path.join(__dirname, 'fixtures', 'folded-strip.yaml');
const foldedStripExpectedPath = path.join(__dirname, 'fixtures', 'folded-strip-expected.yaml');

const foldedClipPath = path.join(__dirname, 'fixtures', 'folded-clip.yaml');
const foldedClipExpectedPath = path.join(__dirname, 'fixtures', 'folded-clip-expected.yaml');

const foldedIndentationIndicatorPath = path.join(
  __dirname,
  'fixtures',
  'folded-indentation-indicator.yaml',
);
const foldedIndentationIndicatorExpectedPath = path.join(
  __dirname,
  'fixtures',
  'folded-indentation-indicator-expected.yaml',
);

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

        context('formatBlockLiteral', function () {
          specify('should format literal + keep', function () {
            const text = fs.readFileSync(literalKeepPath).toString();
            const scalar = YamlScalar({
              style: YamlStyle.Literal,
              styleGroup: YamlStyleGroup.Block,
              text,
            });
            const expected = fs.readFileSync(literalKeepExpectedPath).toString();
            assert.strictEqual(scalar.content, expected);
          });

          specify('should format literal + strip', function () {
            const text = fs.readFileSync(literalStripPath).toString();
            const scalar = YamlScalar({
              style: YamlStyle.Literal,
              styleGroup: YamlStyleGroup.Block,
              text,
            });
            const expected = fs.readFileSync(literalStripExpectedPath).toString().trimRight();
            assert.strictEqual(scalar.content, expected);
          });

          specify('should format literal + clip', function () {
            const text = fs.readFileSync(literalClipPath).toString();
            const scalar = YamlScalar({
              style: YamlStyle.Literal,
              styleGroup: YamlStyleGroup.Block,
              text,
            });
            const expected = fs.readFileSync(literalClipExpectedPath).toString();
            assert.strictEqual(scalar.content, expected);
          });

          specify('should format literal + clip + indentation indicator', function () {
            const text = fs.readFileSync(literalIndentationIndicatorPath).toString();
            const scalar = YamlScalar({
              style: YamlStyle.Literal,
              styleGroup: YamlStyleGroup.Block,
              text,
            });
            const expected = fs.readFileSync(literalIndentationIndicatorExpectedPath).toString();
            assert.strictEqual(scalar.content, expected);
          });
        });

        context('formatBlockFolded', function () {
          specify('should format folded + keep', function () {
            const text = fs.readFileSync(foldedKeepPath).toString();
            const scalar = YamlScalar({
              style: YamlStyle.Folded,
              styleGroup: YamlStyleGroup.Block,
              text,
            });
            const expected = fs.readFileSync(foldedKeepExpectedPath).toString();
            assert.strictEqual(scalar.content, expected);
          });

          specify('should format folded + strip', function () {
            const text = fs.readFileSync(foldedStripPath).toString();
            const scalar = YamlScalar({
              style: YamlStyle.Folded,
              styleGroup: YamlStyleGroup.Block,
              text,
            });
            const expected = fs.readFileSync(foldedStripExpectedPath).toString().trimRight();
            assert.strictEqual(scalar.content, expected);
          });

          specify('should format folded + clip', function () {
            const text = fs.readFileSync(foldedClipPath).toString();
            const scalar = YamlScalar({
              style: YamlStyle.Folded,
              styleGroup: YamlStyleGroup.Block,
              text,
            });
            const expected = fs.readFileSync(foldedClipExpectedPath).toString();
            assert.strictEqual(scalar.content, expected);
          });

          specify('should format folded + clip + indentation indicator', function () {
            const text = fs.readFileSync(foldedIndentationIndicatorPath).toString();
            const scalar = YamlScalar({
              style: YamlStyle.Folded,
              styleGroup: YamlStyleGroup.Block,
              text,
            });
            const expected = fs.readFileSync(foldedIndentationIndicatorExpectedPath).toString();
            assert.strictEqual(scalar.content, expected);
          });
        });
      });
    });
  });
});
