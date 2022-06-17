import { Buffer } from 'node:buffer';

const btoa = (val: string) => {
  const buffer = Buffer.from(val.toString(), 'binary');
  return buffer.toString('base64');
};

export default btoa;
