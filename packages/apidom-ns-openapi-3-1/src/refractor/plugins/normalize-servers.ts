import type { Namespace } from '@swagger-api/apidom-core';
import {
  PathItemServersElement,
  OperationServersElement,
  ServersElement,
} from '@swagger-api/apidom-ns-openapi-3-0';

import type OpenApi3_1Element from '../../elements/OpenApi3-1';
import type PathItemElement from '../../elements/PathItem';
import type ServerElement from '../../elements/Server';
import type OperationElement from '../../elements/Operation';
import type { Predicates } from '../toolbox';

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
 */

/* eslint-disable no-param-reassign */
const plugin =
  () =>
  ({ predicates, namespace }: { predicates: Predicates; namespace: Namespace }) => {
    return {
      visitor: {
        OpenApi3_1Element(openapiElement: OpenApi3_1Element) {
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
        },
        PathItemElement(
          pathItemElement: PathItemElement,
          key: any,
          parent: any,
          path: any,
          ancestors: any[],
        ) {
          // skip visiting this Path Item
          if (ancestors.some(predicates.isComponentsElement)) return;
          if (!ancestors.some(predicates.isOpenApi3_1Element)) return;

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
          }
        },
        OperationElement(
          operationElement: OperationElement,
          key: any,
          parent: any,
          path: any,
          ancestors: any[],
        ) {
          // skip visiting this Operation
          if (ancestors.some(predicates.isComponentsElement)) return;
          if (!ancestors.some(predicates.isOpenApi3_1Element)) return;

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
          }
        },
      },
    };
  };
/* eslint-enable */

export default plugin;
