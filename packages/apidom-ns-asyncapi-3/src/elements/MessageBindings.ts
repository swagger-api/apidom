import { MessageBindingsElement } from '@swagger-api/apidom-ns-asyncapi-2';

import Ros2MessageBindingElement from './bindings/ros2/Ros2MessageBinding.ts';

/**
 * @public
 */
class MessageBindings extends MessageBindingsElement {
  get ros2(): Ros2MessageBindingElement | undefined {
    return this.get('ros2');
  }

  set ros2(ros2: Ros2MessageBindingElement | undefined) {
    this.set('ros2', ros2);
  }
}

export default MessageBindings;
