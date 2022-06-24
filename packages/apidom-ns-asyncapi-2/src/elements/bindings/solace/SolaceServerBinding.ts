import { ObjectElement, StringElement, Attributes, Meta } from '@swagger-api/apidom-core';

class SolaceServerBinding extends ObjectElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'solaceServerBinding';
    this.classes.push('server-binding');
  }

  get bindingVersion(): StringElement {
    return this.get('bindingVersion');
  }

  set bindingVersion(bindingVersion: StringElement) {
    this.set('bindingVersion', bindingVersion);
  }

  get msgVpn(): StringElement {
    return this.get('msgVpn');
  }

  set msgVpn(msgVpn: StringElement) {
    this.set('msgVpn', msgVpn);
  }
}

export default SolaceServerBinding;
