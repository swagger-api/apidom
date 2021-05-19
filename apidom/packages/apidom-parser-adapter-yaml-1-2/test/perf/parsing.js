require('@babel/register')({ extensions: ['.js', '.ts'], rootMode: 'upward' });

const Benchmark = require('benchmark');

const { parse } = require('../../src/adapter-node');

const yaml = `
---
openapi: 3.1.0
info:
  title: Webhook Example
  version: 1.0.0
  description: description
  summary: summary
  termsOfService: tos
components:
  schemas:
    Pet:
      required:
      - id
      - name
      properties:
        id:
          type: integer
          format: int64
        name:
          type: string
        tag:
          type: string
    Pet1:
      required:
      - id
      - name
      properties:
        id:
          type: integer
          format: int64
        name:
          type: string
        tag:
          type: string
    Pet2:
      required:
      - id
      - name
      properties:
        id:
          type: integer
          format: int64
        name:
          type: string
        tag:
          type: string
    Pet3:
      required:
      - id
      - name
      properties:
        id:
          type: integer
          format: int64
        name:
          type: string
        tag:
          type: string
    Pet4:
      required:
      - id
      - name
      properties:
        id:
          type: integer
          format: int64
        name:
          type: string
        tag:
          type: string
    Pet5:
      required:
      - id
      - name
      properties:
        id:
          type: integer
          format: int64
        name:
          type: string
        tag:
          type: string
    Pet6:
      required:
      - id
      - name
      properties:
        id:
          type: integer
          format: int64
        name:
          type: string
        tag:
          type: string
    Pet7:
      required:
      - id
      - name
      properties:
        id:
          type: integer
          format: int64
        name:
          type: string
        tag:
          type: string
    Pet8:
      required:
      - id
      - name
      properties:
        id:
          type: integer
          format: int64
        name:
          type: string
        tag:
          type: string
    Pet9:
      required:
      - id
      - name
      properties:
        id:
          type: integer
          format: int64
        name:
          type: string
        tag:
          type: string
    Pet10:
      required:
      - id
      - name
      properties:
        id:
          type: integer
          format: int64
        name:
          type: string
        tag:
          type: string
    Pet11:
      required:
      - id
      - name
      properties:
        id:
          type: integer
          format: int64
        name:
          type: string
        tag:
          type: string
    Pet12:
      required:
      - id
      - name
      properties:
        id:
          type: integer
          format: int64
        name:
          type: string
        tag:
          type: string
    Pet13:
      required:
      - id
      - name
      properties:
        id:
          type: integer
          format: int64
        name:
          type: string
        tag:
          type: string
    Pet14:
      required:
      - id
      - name
      properties:
        id:
          type: integer
          format: int64
        name:
          type: string
        tag:
          type: string
    Pet15:
      required:
      - id
      - name
      properties:
        id:
          type: integer
          format: int64
        name:
          type: string
        tag:
          type: string
    Pet16:
      required:
      - id
      - name
      properties:
        id:
          type: integer
          format: int64
        name:
          type: string
        tag:
          type: string
    Pet17:
      required:
      - id
      - name
      properties:
        id:
          type: integer
          format: int64
        name:
          type: string
        tag:
          type: string
    Pet18:
      required:
      - id
      - name
      properties:
        id:
          type: integer
          format: int64
        name:
          type: string
        tag:
          type: string
    Pet19:
      required:
      - id
      - name
      properties:
        id:
          type: integer
          format: int64
        name:
          type: string
        tag:
          type: string
    Pet20:
      required:
      - id
      - name
      properties:
        id:
          type: integer
          format: int64
        name:
          type: string
        tag:
          type: string
    Pet21:
      required:
      - id
      - name
      properties:
        id:
          type: integer
          format: int64
        name:
          type: string
        tag:
          type: string
    Pet22:
      required:
      - id
      - name
      properties:
        id:
          type: integer
          format: int64
        name:
          type: string
        tag:
          type: string
    Pet23:
      required:
      - id
      - name
      properties:
        id:
          type: integer
          format: int64
        name:
          type: string
        tag:
          type: string
    Pet24:
      required:
      - id
      - name
      properties:
        id:
          type: integer
          format: int64
        name:
          type: string
        tag:
          type: string
    Pet25:
      required:
      - id
      - name
      properties:
        id:
          type: integer
          format: int64
        name:
          type: string
        tag:
          type: string
`;

const options = {
  name: 'parsing',
  defer: true,
  minSamples: 600,
  expected: '4.74 ops/sec ±0.72% (623 runs sampled)',
  async fn(deferred) {
    await parse(yaml);
    deferred.resolve();
  },
};

module.exports = options;

// we're running as a script
if (module.parent === null) {
  const bench = new Benchmark({
    ...options,
    onComplete(event) {
      console.info(String(event.target));
    },
    onError(event) {
      console.error(event);
    },
  });
  bench.run();
}
