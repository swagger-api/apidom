export const isNodeType = (type: string, node: any): boolean => node?.type === type;

export const isLiteral = isNodeType.bind(undefined, 'literal');

export const isPosition = isNodeType.bind(undefined, 'position');

export const isPoint = isNodeType.bind(undefined, 'point');

export const isParseResult = isNodeType.bind(undefined, 'parseResult');
