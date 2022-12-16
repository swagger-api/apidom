import { last } from 'ramda';
import {
  PathItemServersElement,
  OperationServersElement,
} from '@swagger-api/apidom-ns-openapi-3-0';

import OpenApi3_1Element from '../../elements/OpenApi3-1';
import PathItemElement from '../../elements/PathItem';
import ServerElement from '../../elements/Server';
import OperationElement from '../../elements/Operation';
import { Predicates } from '../toolbox';

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
  ({ predicates }: { predicates: Predicates }) => {
    let openAPIServers: ServerElement[] | undefined;
    const pathItemServers: (ServerElement[] | undefined)[] = [];

    return {
      visitor: {
        OpenApi3_1Element: {
          enter(openapiElement: OpenApi3_1Element) {
            if (predicates.isArrayElement(openapiElement.servers)) {
              openAPIServers = openapiElement.servers?.content as ServerElement[];
            }
          },
          leave() {
            openAPIServers = undefined;
          },
        },
        PathItemElement: {
          enter(
            pathItemElement: PathItemElement,
            key: any,
            parent: any,
            path: any,
            ancestors: any[],
          ) {
            // skip visiting this Path Item
            if (ancestors.some(predicates.isComponentsElement)) {
              return;
            }

            // duplicate OpenAPI.servers into this Path Item object
            if (
              typeof pathItemElement.servers === 'undefined' &&
              typeof openAPIServers !== 'undefined'
            ) {
              pathItemElement.servers = new PathItemServersElement(openAPIServers);
            }

            // prepare Server Objects for child Operation Objects
            const { servers } = pathItemElement;
            if (typeof servers !== 'undefined' && predicates.isArrayElement(servers)) {
              pathItemServers.push([...servers.content] as ServerElement[]);
            } else {
              pathItemServers.push(undefined);
            }
          },
          leave() {
            pathItemServers.pop();
          },
        },
        OperationElement: {
          enter(operationElement: OperationElement) {
            const parentPathItemServers = last(pathItemServers);

            // no Server Objects defined in parents
            if (typeof parentPathItemServers === 'undefined') return;
            // Server Objects are defined for this Operation Object
            if (predicates.isArrayElement(operationElement.servers)) return;

            // duplicate parent PathItem.servers into this Operation object
            operationElement.servers = new OperationServersElement(parentPathItemServers);
          },
        },
      },
    };
  };
/* eslint-enable */

export default plugin;
