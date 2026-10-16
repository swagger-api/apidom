import { ServerBindingsElement } from '@swagger-api/apidom-ns-asyncapi-2';

import Ros2ServerBindingElement from './bindings/ros2/Ros2ServerBinding.ts';

/**
 * @public
 */
class ServerBindings extends ServerBindingsElement {
  get ros2(): Ros2ServerBindingElement | undefined {
    return this.get('ros2');
  }

  set ros2(ros2: Ros2ServerBindingElement | undefined) {
    this.set('ros2', ros2);
  }
}

export default ServerBindings;
