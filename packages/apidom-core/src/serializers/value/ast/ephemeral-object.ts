class EphemeralObject {
  type = 'EphemeralObject';

  content: any[] = [];

  reference: any = undefined;

  constructor(content: any[]) {
    this.content = content;
    this.reference = {};
  }

  toReference() {
    return this.reference;
  }

  toObject() {
    return Object.assign(this.reference, Object.fromEntries(this.content));
  }
}

export default EphemeralObject;
