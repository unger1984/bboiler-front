/* eslint-disable @typescript-eslint/no-var-requires */
const { merge: webpackMerge } = require('webpack-merge');
const common = require('./webpack/webpack.base');

const envs = {
	development: 'dev',
	production: 'prod',
};

const env = envs[process.env.NODE_ENV || 'development'];
const envConfig = require(`./webpack/webpack.${env}.js`);
module.exports = webpackMerge(common, envConfig);
