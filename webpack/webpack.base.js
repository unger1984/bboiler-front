/* eslint-disable @typescript-eslint/no-var-requires */
const webpack = require('webpack');
const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const DirectoryNamedWebpackPlugin = require('directory-named-webpack-plugin');

module.exports = {
	entry: resolve(__dirname, '../', 'src/index.tsx'),
	resolve: {
		extensions: ['.ts', '.tsx', '.js'],
		alias: {
			assets: resolve(__dirname, '../src/assets'),
			api: resolve(__dirname, '../src/api'),
			config: resolve(__dirname, '../src/config'),
			scss: resolve(__dirname, '../src/scss'),
			components: resolve(__dirname, '../src/components'),
			common: resolve(__dirname, '../src/components/common'),
			shared: resolve(__dirname, '../src/components/shared'),
			ducks: resolve(__dirname, '../src/ducks'),
			utils: resolve(__dirname, '../src/utils'),
			models: resolve(__dirname, '../src/models'),
			dto: resolve(__dirname, '../src/dto'),
			hooks: resolve(__dirname, '../src/hooks'),
		},
		plugins: [new DirectoryNamedWebpackPlugin()],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: resolve(__dirname, '../', `src/index.html.ejs`),
		}),
		new ProgressBarPlugin(),
		new ESLintPlugin({
			emitWarning: process.env.NODE_ENV !== 'production',
		}),
		new webpack.ContextReplacementPlugin(/moment[\\]locale$/, /en|ru/),
	],
	module: {
		rules: [
			{
				test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
				type: 'asset/resource',
				generator: {
					filename: '[name][ext]',
				},
			},
			{
				test: /\.(ts|tsx)$/,
				exclude: /(node_modules)/,
				use: {
					loader: 'ts-loader',
					options: {
						transpileOnly: true,
					},
				},
			},
			{
				test: /\.(png|jpg|gif|svg)$/,
				exclude: /static/,
				type: 'asset/resource',
				generator: {
					filename: '[name][ext]',
				},
			},
		],
	},
};
