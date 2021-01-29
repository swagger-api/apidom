import stampit from 'stampit';

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

interface YamlStyleModel {
  styleGroup: YamlStyleGroup | null;
  style: YamlStyle | null;
}

const YamlStyleModel: stampit.Stamp<YamlStyleModel> = stampit({
  props: {
    styleGroup: null,
    style: null,
  },
});

export default YamlStyleModel;
