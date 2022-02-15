import dts from 'rollup-plugin-dts';

const config = [
  {
    input: './types/index.d.ts',
    output: [{ file: 'types/dist.d.ts', format: 'es' }],
    plugins: [dts()],
  },
];

export default config;
