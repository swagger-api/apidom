import * as fs from 'fs';
import * as path from 'path';
import { assert } from 'chai';

import YamlScalar from '../../../../../src/yaml/nodes/YamlScalar';
import { YamlStyle, YamlStyleGroup } from '../../../../../src/yaml/nodes/YamlStyle';
import ScalarTag from '../../../../../src/yaml/schemas/ScalarTag';

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

context('yaml', function () {
  context('schemas', function () {
    context('canonical-format', function () {
      context('formatFlowPlain', function () {
        specify('should format', function () {
          const content = fs.readFileSync(plainPath).toString();
          const tag = ScalarTag();
          const scalar = tag.canonicalFormat(
            YamlScalar({
              style: YamlStyle.Plain,
              styleGroup: YamlStyleGroup.Flow,
              content,
            }),
          );
          const expected = fs.readFileSync(plainExpectedPath).toString().trimRight();

          assert.strictEqual(scalar.content, expected);
        });
      });

      context('formatFlowSingleQuoted', function () {
        specify('should format', function () {
          const content = fs.readFileSync(singleQuotedPath).toString();
          const tag = ScalarTag();
          const scalar = tag.canonicalFormat(
            YamlScalar({
              style: YamlStyle.SingleQuoted,
              styleGroup: YamlStyleGroup.Flow,
              content,
            }),
          );
          const expected = fs.readFileSync(singleQuotedExceptedPath).toString().trimRight();

          assert.strictEqual(scalar.content, expected);
        });
      });

      context('formatFlowDoubleQuoted', function () {
        specify('should format', function () {
          const content = fs.readFileSync(doubleQuotedPath).toString();
          const tag = ScalarTag();
          const scalar = tag.canonicalFormat(
            YamlScalar({
              style: YamlStyle.DoubleQuoted,
              styleGroup: YamlStyleGroup.Flow,
              content,
            }),
          );
          const expected = fs.readFileSync(doubleQuotedExceptedPath).toString().trimRight();

          assert.strictEqual(scalar.content, expected);
        });
      });

      context('formatBlockLiteral', function () {
        specify('should format literal + keep', function () {
          const content = fs.readFileSync(literalKeepPath).toString();
          const tag = ScalarTag();
          const scalar = tag.canonicalFormat(
            YamlScalar({
              style: YamlStyle.Literal,
              styleGroup: YamlStyleGroup.Block,
              content,
            }),
          );
          const expected = fs.readFileSync(literalKeepExpectedPath).toString();

          assert.strictEqual(scalar.content, expected);
        });

        specify('should format literal + strip', function () {
          const content = fs.readFileSync(literalStripPath).toString();
          const tag = ScalarTag();
          const scalar = tag.canonicalFormat(
            YamlScalar({
              style: YamlStyle.Literal,
              styleGroup: YamlStyleGroup.Block,
              content,
            }),
          );
          const expected = fs.readFileSync(literalStripExpectedPath).toString().trimRight();

          assert.strictEqual(scalar.content, expected);
        });

        specify('should format literal + clip', function () {
          const content = fs.readFileSync(literalClipPath).toString();
          const tag = ScalarTag();
          const scalar = tag.canonicalFormat(
            YamlScalar({
              style: YamlStyle.Literal,
              styleGroup: YamlStyleGroup.Block,
              content,
            }),
          );
          const expected = fs.readFileSync(literalClipExpectedPath).toString();

          assert.strictEqual(scalar.content, expected);
        });

        specify('should format literal + clip + indentation indicator', function () {
          const content = fs.readFileSync(literalIndentationIndicatorPath).toString();
          const tag = ScalarTag();
          const scalar = tag.canonicalFormat(
            YamlScalar({
              style: YamlStyle.Literal,
              styleGroup: YamlStyleGroup.Block,
              content,
            }),
          );
          const expected = fs.readFileSync(literalIndentationIndicatorExpectedPath).toString();

          assert.strictEqual(scalar.content, expected);
        });
      });

      context('formatBlockFolded', function () {
        specify('should format folded + keep', function () {
          const content = fs.readFileSync(foldedKeepPath).toString();
          const tag = ScalarTag();
          const scalar = tag.canonicalFormat(
            YamlScalar({
              style: YamlStyle.Folded,
              styleGroup: YamlStyleGroup.Block,
              content,
            }),
          );
          const expected = fs.readFileSync(foldedKeepExpectedPath).toString();

          assert.strictEqual(scalar.content, expected);
        });

        specify('should format folded + strip', function () {
          const content = fs.readFileSync(foldedStripPath).toString();
          const tag = ScalarTag();
          const scalar = tag.canonicalFormat(
            YamlScalar({
              style: YamlStyle.Folded,
              styleGroup: YamlStyleGroup.Block,
              content,
            }),
          );
          const expected = fs.readFileSync(foldedStripExpectedPath).toString().trimRight();

          assert.strictEqual(scalar.content, expected);
        });

        specify('should format folded + clip', function () {
          const content = fs.readFileSync(foldedClipPath).toString();
          const tag = ScalarTag();
          const scalar = tag.canonicalFormat(
            YamlScalar({
              style: YamlStyle.Folded,
              styleGroup: YamlStyleGroup.Block,
              content,
            }),
          );
          const expected = fs.readFileSync(foldedClipExpectedPath).toString();

          assert.strictEqual(scalar.content, expected);
        });

        specify('should format folded + clip + indentation indicator', function () {
          const content = fs.readFileSync(foldedIndentationIndicatorPath).toString();
          const tag = ScalarTag();
          const scalar = tag.canonicalFormat(
            YamlScalar({
              style: YamlStyle.Folded,
              styleGroup: YamlStyleGroup.Block,
              content,
            }),
          );
          const expected = fs.readFileSync(foldedIndentationIndicatorExpectedPath).toString();

          assert.strictEqual(scalar.content, expected);
        });
      });
    });
  });
});
