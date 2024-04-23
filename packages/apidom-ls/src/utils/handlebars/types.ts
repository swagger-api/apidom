import jsYaml from 'js-yaml';

export interface ExploreSpec {
  spec: string;
  specUrl?: string;
  root: string;
  types: ExploreType[];
}

export interface ExploreChild {
  name: string;
  type: string | string[];
  collection?: 'list';
  isPatternField?: boolean;
  keyHint?: string;
  // example?: string;
  valueHint?: string;
  constraints?: string[];
}

export interface ExploreType {
  name: string;
  children: ExploreChild[];
}

export interface RenderGraph {
  // spec: string;
  name: string;
  types: string[];
  attributes: RenderGraphAttributes;
  children: RenderGraph[];
  childrenMap: { [key: string]: RenderGraph };
  parent?: RenderGraph;
}

export interface RenderGraphAttributes {
  collection?: 'list';
  isPatternField?: boolean;
  keyHint?: string;
  valueHint?: string;
}

// const exampleTree:  = {
//   name: 'openapi-3-1',
//   type: 'OpenAPI 3.1',
//   children: [
//     {name: 'openapi', example: '3.1.x', type: 'string'},
//     {name: 'info', type: 'Info Object', children: []},
//     {name: 'servers', type: 'Server Object', collection:'list', children: []},
//     {name: 'paths', type: 'Paths Object',
//       children: [
// 	{name: '/{path}', type: 'Path Object', isPatternField: true,
// 	  children: [
// 	    {name: 'get', type: 'Operation Object'},
// 	    {name: 'put', type: 'Operation Object'},
// 	    {name: 'put', type: 'Operation Object'},
// 	  ]},

//       ]},

//   ]

// }

export interface RenderGraphIndex {
  [key: string]: RenderGraph;
}

export function exploreTypeToRenderGraph(
  typeName: string,
  exploreTypes: ExploreType[],
  index: RenderGraphIndex = {},
): RenderGraph {
  if (!index[typeName]) {
    // Need to set immeidately, so we can reference it later on.
    // eslint-disable-next-line no-param-reassign
    index[typeName] = {
      attributes: {},
      children: [],
      name: typeName,
      types: [typeName],
      childrenMap: {},
    };

    const exploreType = exploreTypes.find((t) => t.name === typeName);

    if (exploreType) {
      exploreType.children.forEach((child) => {
        const childTypes = Array.isArray(child.type) ? child.type : [child.type];

        childTypes.forEach((childType) => {
          if (!index[childType]) {
            // eslint-disable-next-line no-param-reassign
            index[childType] = exploreTypeToRenderGraph(childType, exploreTypes, index);
          }
        });
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        const childChildren = unionOfChildren(childTypes, index);
        const childrenMap: { [key: string]: RenderGraph } = childChildren.reduce((acc, item) => {
            acc[item.name] = item;
            return acc;
          },
          {} as { [key: string]: RenderGraph },
        );

        const newNode: RenderGraph = {
          name: child.name,
          types: childTypes,
          attributes: {},
          children: childChildren,
          childrenMap,
          parent: index[typeName],
        };

        // Manually add, so we don't serialize with undefined types
        const { collection, isPatternField, keyHint, valueHint } = child;
        if (typeof collection !== 'undefined') newNode.attributes.collection = collection;
        if (typeof isPatternField !== 'undefined')
          newNode.attributes.isPatternField = isPatternField;
        if (typeof keyHint !== 'undefined') newNode.attributes.keyHint = keyHint;
        if (typeof valueHint !== 'undefined') newNode.attributes.valueHint = valueHint;

        index[typeName].children.push(newNode);
        // eslint-disable-next-line no-param-reassign
        index[typeName].childrenMap[child.name] = newNode;
      });
    }
  }

  return index[typeName];
}

export function unionOfChildren(types: string[], index: RenderGraphIndex) {
  if (types.length <= 1) {
    return index[types[0]].children;
  }

  const doneSoFar = new Set<string>();
  const children: RenderGraph[] = [];
  types.forEach((t) => {
    index[t]?.children.forEach((child) => {
      if (!doneSoFar.has(child.name)) {
        children.push(child);
        doneSoFar.add(child.name);
      }
    });
  });

  return children;
}

export function fromYaml(str: string): any {
  return jsYaml.load(str);
}

export function getTypes(str: string): ExploreSpec {
  const types = fromYaml(str) as ExploreSpec;
  return types;
}

export interface RenderGraphWithIndex {
  node: RenderGraph;
  index: RenderGraphIndex;
  exploreDefinition: ExploreSpec;
}
export function getTree(str: string): RenderGraphWithIndex {
  const exploreDefinition = getTypes(str);
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  return parseTypeSchema(exploreDefinition);
}

export default function parseTypeSchema(exploreDefinition: ExploreSpec): RenderGraphWithIndex {
  const rootType = exploreDefinition.types.find((t) => t.name === exploreDefinition.root);
  if (!rootType) {
    throw new Error(`Exploration Spec is missing the root type, ${exploreDefinition.root}`);
  }

  const index: { [key: string]: RenderGraph } = {};
  const rootNode: RenderGraph = exploreTypeToRenderGraph(
    exploreDefinition.root,
    exploreDefinition.types,
    index,
  );

  return { node: rootNode, index, exploreDefinition };
}

export function queryToAddress(queryToken: string): string {
  return queryToken.replace(/\+/g, ' ');
}

export function addressToQuery(queryToken: string): string {
  return queryToken.replace(/ /g, '+');
}

export function linkToSpecTypeField(
  spec?: string | null,
  typeName?: string | null,
  fieldPath?: string | null,
): string {
  // eslint-disable-next-line no-param-reassign
  spec = spec || '';
  // eslint-disable-next-line no-param-reassign
  typeName = typeName || '';
  // eslint-disable-next-line no-param-reassign
  fieldPath = fieldPath || '';
  if (!spec) return '/';
  if (!typeName) return `/${addressToQuery(spec)}`;
  if (!fieldPath) return `/${[spec, typeName].map(addressToQuery).join('/')}`;

  return `/${[spec, typeName, ...fieldPath.split('/').slice(1)].map(addressToQuery).join('/')}`;
}
