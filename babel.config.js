/* eslint-env node */

module.exports = function (api) {
  api.cache(() => process.env.NODE_ENV);

  return {
    compact: false,
    sourceMaps: 'both',
    retainLines: true,
    presets: [
      [
        '@babel/preset-env',
        {
          // targets: envTargets,
          debug: Boolean(process.env.BABEL_DEBUG),
          corejs: 3,
          useBuiltIns: 'usage',
          modules: false,
        },
      ],
      '@babel/preset-react',
      '@babel/preset-typescript',
    ],
    plugins: [
      ['@babel/plugin-proposal-class-properties', { loose: false }],
      '@babel/plugin-proposal-optional-chaining',
      process.env.JEST_WORKER_ID && '@babel/plugin-transform-modules-commonjs',
    ].filter(Boolean),
  };
};
