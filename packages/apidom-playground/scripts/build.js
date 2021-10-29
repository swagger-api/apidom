const path = require('path');
const rewire = require('rewire');

process.chdir(path.join(__dirname, '..'));

const build = rewire('react-scripts/scripts/build.js');
const config = build.__get__('config');

// display errors for child compilations
config.stats = {
    ...config.stats,
    children: true
};

// fallbacks
config.resolve.fallback = {
    ...config.resolve.fallback,
    fs: false,
    path: false,
};

// loading wasm + web workers
const rulesOneOf = config.module.rules.find(obj => Array.isArray(obj.oneOf));
rulesOneOf.oneOf.unshift(
    {
        test: [/\.wasm$/],
        use: {
            loader: 'file-loader',
            options: {
                name: 'static/wasm/[name].[contenthash:8].wasm',
            },
        },
        type: 'javascript/auto',
    },
    {
        test: [/\.worker\.js$/],
        use: {
            loader: 'worker-loader',
        },
    },
);

// no need to provide the file extension
const mjsRule = rulesOneOf.oneOf.find(rule => String(rule.test) === '/\\.(js|mjs)$/');
mjsRule.resolve = {
    ...mjsRule.resolve,
    fullySpecified: false
};
