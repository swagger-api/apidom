import { ChannelBindingsElement } from '@swagger-api/apidom-ns-asyncapi-2';

import Ros2ChannelBindingElement from './bindings/ros2/Ros2ChannelBinding.ts';

/**
 * @public
 */
class ChannelBindings extends ChannelBindingsElement {
  get ros2(): Ros2ChannelBindingElement | undefined {
    return this.get('ros2');
  }

  set ros2(ros2: Ros2ChannelBindingElement | undefined) {
    this.set('ros2', ros2);
  }
}

export default ChannelBindings;
