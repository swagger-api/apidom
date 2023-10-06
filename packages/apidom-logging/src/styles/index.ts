import StringTemplateStyle from './StringTemplateStyle';
import TemplateLiteralStyle from './TemplateLiteralStyle';
import type { Format as TemplateLiteralStyleFormat } from './TemplateLiteralStyle';

const stringTemplateStyle: [typeof StringTemplateStyle, string] = [
  StringTemplateStyle,
  '${levelname}:${name}:${message}', // eslint-disable-line no-template-curly-in-string
];

const templateLiteralStyle: [typeof TemplateLiteralStyle, TemplateLiteralStyleFormat] = [
  TemplateLiteralStyle,
  ({ levelname, name, message }) => `${levelname}:${name}:${message}`,
];

const STYLES = {
  $: stringTemplateStyle,
  '`': templateLiteralStyle,
};

export default STYLES;
