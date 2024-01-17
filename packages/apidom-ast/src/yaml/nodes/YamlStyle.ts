export enum YamlStyle {
  Plain = 'Plain',
  SingleQuoted = 'SingleQuoted',
  DoubleQuoted = 'DoubleQuoted',
  Literal = 'Literal',
  Folded = 'Folded',
  Explicit = 'Explicit',
  SinglePair = 'SinglePair',
  NextLine = 'NextLine',
  InLine = 'InLine',
}

export enum YamlStyleGroup {
  Flow = 'Flow',
  Block = 'Block',
}

export interface YamlStyleModel {
  styleGroup: YamlStyleGroup | null;
  style: YamlStyle | null;
}

export default YamlStyleModel;
