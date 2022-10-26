/* eslint-disable @typescript-eslint/no-var-requires */
const webpack = require('webpack');
const { resolve } = require('path');
require('dotenv').config();

module.exports = {
	mode: 'development',
	output: {
		filename: '[name].js',
		path: resolve(__dirname, '../', 'distr'),
		chunkFilename: '[name].js',
		publicPath: '/',
	},
	devtool: 'inline-source-map',
	devServer: {
		historyApiFallback: true,
		compress: true,
		hot: true,
		port: process.env.PORT || 8441,
		// https: {
		// 	cert: resolve(__dirname, '../', 'certs/chain.pem'),
		// 	key: resolve(__dirname, '../', 'certs/key.pem'),
		// },
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.LoaderOptionsPlugin({
			debug: true,
		}),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify('development'),
		}),
	],
	module: {
		rules: [
			{
				use: [
					'style-loader',
					'css-loader',
					'sass-loader',
					// {
					// 	loader: 'sass-resources-loader',
					// 	options: {
					// 		resources: [
					// 			resolve(__dirname, '../src/scss/_fonts.scss'),
					// 			resolve(__dirname, '../src/scss/_variables.scss'),
					// 			resolve(__dirname, '../src/scss/_mixins.scss'),
					// 			resolve(__dirname, '../src/scss/_basic.scss'),
					// 		],
					// 	},
					// },
				],
				test: /\.scss$/,
				// loader: 'style-loader!css-loader!sass-loader',
				exclude: /node_modules/,
			},
			{
				use: ['style-loader', 'css-loader'],
				test: /\.css$/,
			},
		],
	},
};
