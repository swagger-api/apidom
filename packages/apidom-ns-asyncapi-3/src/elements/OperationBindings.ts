import { OperationBindingsElement } from '@swagger-api/apidom-ns-asyncapi-2';

import Ros2OperationBindingElement from './bindings/ros2/Ros2OperationBinding.ts';

/**
 * @public
 */
class OperationBindings extends OperationBindingsElement {
  get ros2(): Ros2OperationBindingElement | undefined {
    return this.get('ros2');
  }

  set ros2(ros2: Ros2OperationBindingElement | undefined) {
    this.set('ros2', ros2);
  }
}

export default OperationBindings;
