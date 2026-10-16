import { StringElement, ObjectElement, Attributes, Meta } from '@swagger-api/apidom-core';

/**
 * @public
 */
class Ros2OperationBinding extends ObjectElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'ros2OperationBinding';
    this.classes.push('operation-binding');
  }

  get role(): StringElement | undefined {
    return this.get('role');
  }

  set role(role: StringElement | undefined) {
    this.set('role', role);
  }

  get node(): StringElement | undefined {
    return this.get('node');
  }

  set node(node: StringElement | undefined) {
    this.set('node', node);
  }

  get qosPolicies(): ObjectElement | undefined {
    return this.get('qosPolicies');
  }

  set qosPolicies(qosPolicies: ObjectElement | undefined) {
    this.set('qosPolicies', qosPolicies);
  }

  get bindingVersion(): StringElement | undefined {
    return this.get('bindingVersion');
  }

  set bindingVersion(bindingVersion: StringElement | undefined) {
    this.set('bindingVersion', bindingVersion);
  }
}

export default Ros2OperationBinding;
