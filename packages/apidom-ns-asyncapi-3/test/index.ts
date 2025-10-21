import { expect } from 'chai';
import fs from 'fs';
import path from 'path';

import refract from '../src/refractor/index.ts';

describe('apidom-ns-asyncapi-3 basic refractor', () => {
  it('parses a simple asyncapi v3 fixture into elements', () => {
    const __dirname = path.dirname(new URL(import.meta.url).pathname);
    const fixturePath = path.join(__dirname, 'fixtures', 'simple-asyncapi-3.json');
    const fixture = JSON.parse(fs.readFileSync(fixturePath, 'utf8'));

    const element = refract(fixture as unknown);
    

  expect(element).to.exist;
  expect(element.element).to.equal('asyncApi3');

  // channels.user/signedup.publish.message should be a message element
  const channels = typeof element.get === 'function' ? element.get('channels') : undefined;
  expect(channels).to.exist;
  // robust lookup: iterate members to find key 'user/signedup'
  let channel: any = undefined;
  if (channels && typeof channels.content !== 'undefined') {
    Object.values((channels as any).content || {}).forEach((m: any) => {
      if (!m) return;
      // member may be a wrapper without .get; try _storedElement or content
      if (typeof m.get === 'function') {
        const keyEl = m.get('key');
        if (keyEl && typeof (keyEl as any).toValue === 'function' && (keyEl as any).toValue() === 'user/signedup') {
          channel = m.get('value');
        }
      } else if (m && m._storedElement && m._storedElement.content && m._storedElement.content[0] !== undefined) {
          const keyCandidate = m._storedElement.content[0];
          const valCandidate = m._storedElement.content[1];
          let keyStrCandidate: any = undefined;
          if (typeof keyCandidate === 'string') keyStrCandidate = keyCandidate;
          else if (keyCandidate && typeof keyCandidate.toValue === 'function') keyStrCandidate = keyCandidate.toValue();
          else if (keyCandidate && keyCandidate.value !== undefined) keyStrCandidate = keyCandidate.value;
          else if (keyCandidate && keyCandidate._content !== undefined) keyStrCandidate = keyCandidate._content;
          else if (keyCandidate && keyCandidate.content !== undefined) keyStrCandidate = keyCandidate.content;

          if (keyStrCandidate === 'user/signedup') {
            channel = valCandidate;
          }
        }
    });
  }
  expect(channel).to.exist;
  expect(channel).to.exist;
  const publish = channel && typeof channel.get === 'function' ? channel.get('publish') : undefined;
  expect(publish).to.exist;
  const message = publish && typeof publish.get === 'function' ? publish.get('message') : undefined;
  expect(message).to.exist;
  expect(message.element).to.equal('message');
  const payload = message && typeof message.get === 'function' ? message.get('payload') : undefined;
  expect(payload).to.exist;
  expect(payload.element).to.equal('schema');

  // components.messages.UserSignedUp should be a message element with payload schema
  const components = typeof element.get === 'function' ? element.get('components') : undefined;
  expect(components).to.exist;
  const messages = components && typeof components.get === 'function' ? components.get('messages') : undefined;
  expect(messages).to.exist;
  const userMsg = messages && typeof messages.get === 'function' ? messages.get('UserSignedUp') : undefined;
  expect(userMsg).to.exist;
  expect(userMsg.element).to.equal('message');
  const userPayload = userMsg && typeof userMsg.get === 'function' ? userMsg.get('payload') : undefined;
  expect(userPayload).to.exist;
  expect(userPayload.element).to.equal('schema');
  });
});
