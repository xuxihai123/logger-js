import babel from 'rollup-plugin-babel';

module.exports = {
  input: 'src/index.js',
  plugins: [
    babel({
      exclude: 'node_modules/**',
    }),
  ],
  output: {
    name:'Logger',
    file: 'lib/logger.js',
    format: 'umd',
  },
};
