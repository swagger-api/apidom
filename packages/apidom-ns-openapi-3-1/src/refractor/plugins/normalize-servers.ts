import { Element } from '@swagger-api/apidom-core';
import {
  PathItemServersElement,
  OperationServersElement,
  ServersElement,
} from '@swagger-api/apidom-ns-openapi-3-0';

import type OpenApi3_1Element from '../../elements/OpenApi3-1.ts';
import type PathItemElement from '../../elements/PathItem.ts';
import type ServerElement from '../../elements/Server.ts';
import type OperationElement from '../../elements/Operation.ts';
import type { Toolbox } from '../toolbox.ts';
import NormalizeStorage from './normalize-header-examples/NormalizeStorage.ts';

/**
 * Override of Server Objects.
 *
 * List of Server Objects can be defined in OpenAPI 3.1 on multiple levels:
 *
 *  - OpenAPI.servers
 *  - PathItem.servers
 *  - Operation.servers
 *
 * If an alternative server object is specified at the Path Item Object level, it will override OpenAPI.servers.
 * If an alternative server object is specified at the Operation Object level, it will override PathItem.servers and OpenAPI.servers respectively.
 * @public
 */

export interface PluginOptions {
  storageField?: string;
}

/* eslint-disable no-param-reassign */
/**
 * @public
 */
const plugin =
  ({ storageField = 'x-normalized' }: PluginOptions = {}) =>
  (toolbox: Toolbox) => {
    const { namespace, ancestorLineageToJSONPointer, predicates } = toolbox;
    let storage: NormalizeStorage | undefined;

    return {
      visitor: {
        OpenApi3_1Element: {
          enter(openapiElement: OpenApi3_1Element) {
            const isServersUndefined = typeof openapiElement.servers === 'undefined';
            const isServersArrayElement = predicates.isArrayElement(openapiElement.servers);
            const isServersEmpty = isServersArrayElement && openapiElement.servers!.length === 0;
            // @ts-ignore
            const defaultServer = namespace.elements.Server.refract({ url: '/' });

            if (isServersUndefined || !isServersArrayElement) {
              openapiElement.servers = new ServersElement([defaultServer]);
            } else if (isServersArrayElement && isServersEmpty) {
              openapiElement.servers!.push(defaultServer);
            }
            storage = new NormalizeStorage(openapiElement, storageField, 'servers');
          },
          leave() {
            storage = undefined;
          },
        },
        PathItemElement(
          pathItemElement: PathItemElement,
          key: string | number,
          parent: Element | undefined,
          path: (string | number)[],
          ancestors: [Element | Element[]],
        ) {
          // skip visiting this Path Item
          if (ancestors.some(predicates.isComponentsElement)) return;
          if (!ancestors.some(predicates.isOpenApi3_1Element)) return;

          const pathItemJSONPointer = ancestorLineageToJSONPointer([
            ...ancestors,
            parent!,
            pathItemElement,
          ]);

          // skip visiting this Path Item Object if it's already normalized
          if (storage!.includes(pathItemJSONPointer)) {
            return;
          }

          const parentOpenapiElement = ancestors.find(predicates.isOpenApi3_1Element);
          const isServersUndefined = typeof pathItemElement.servers === 'undefined';
          const isServersArrayElement = predicates.isArrayElement(pathItemElement.servers);
          const isServersEmpty = isServersArrayElement && pathItemElement.servers!.length === 0;

          // duplicate OpenAPI.servers into this Path Item object
          if (predicates.isOpenApi3_1Element(parentOpenapiElement)) {
            const openapiServersContent = parentOpenapiElement.servers?.content;
            const openapiServers = (openapiServersContent ?? []) as ServerElement[];

            if (isServersUndefined || !isServersArrayElement) {
              pathItemElement.servers = new PathItemServersElement(openapiServers);
            } else if (isServersArrayElement && isServersEmpty) {
              openapiServers.forEach((server) => {
                pathItemElement.servers!.push(server);
              });
            }
            storage!.append(pathItemJSONPointer);
          }
        },
        OperationElement(
          operationElement: OperationElement,
          key: string | number,
          parent: Element | undefined,
          path: (string | number)[],
          ancestors: [Element | Element[]],
        ) {
          // skip visiting this Operation
          if (ancestors.some(predicates.isComponentsElement)) return;
          if (!ancestors.some(predicates.isOpenApi3_1Element)) return;

          const operationJSONPointer = ancestorLineageToJSONPointer([
            ...ancestors,
            parent!,
            operationElement,
          ]);

          // skip visiting this Operation Object if it's already normalized
          if (storage!.includes(operationJSONPointer)) {
            return;
          }

          // @TODO(vladimir.gorej@gmail.com): can be replaced by Array.prototype.findLast in future
          const parentPathItemElement = [...ancestors].reverse().find(predicates.isPathItemElement);
          const isServersUndefined = typeof operationElement.servers === 'undefined';
          const isServersArrayElement = predicates.isArrayElement(operationElement.servers);
          const isServersEmpty = isServersArrayElement && operationElement.servers!.length === 0;

          if (predicates.isPathItemElement(parentPathItemElement)) {
            const pathItemServersContent = parentPathItemElement.servers?.content;
            const pathItemServers = (pathItemServersContent ?? []) as ServerElement[];

            if (isServersUndefined || !isServersArrayElement) {
              // duplicate parent PathItem.servers into this Operation object
              operationElement.servers = new OperationServersElement(pathItemServers);
            } else if (isServersArrayElement && isServersEmpty) {
              pathItemServers.forEach((server) => {
                operationElement.servers!.push(server);
              });
            }
            storage!.append(operationJSONPointer);
          }
        },
      },
    };
  };
/* eslint-enable */

export default plugin;
