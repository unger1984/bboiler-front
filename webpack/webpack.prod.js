/* eslint-disable @typescript-eslint/no-var-requires */
const { resolve } = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const uuid = require('uuid');

require('dotenv').config();

module.exports = {
	mode: 'production',
	output: {
		filename: `js/[name].js?v=[chunkhash:4]`,
		path: resolve(__dirname, '../', 'distr'),
		chunkFilename: `js/[name].[chunkhash].js`,
		publicPath: '/',
	},
	devtool: 'source-map',
	optimization: {
		minimizer: [new TerserPlugin(), new CssMinimizerPlugin()],
		splitChunks: {
			chunks: 'all',
			maxInitialRequests: Infinity,
			minSize: 0,
			cacheGroups: {
				vendors: {
					test: /[\\/]node_modules[\\/]/,
					name(module) {
						const match = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/);
						const packageName = match ? match[1] : uuid();
						return `npm.${packageName.replace('@', '')}`;
					},
				},
			},
		},
		runtimeChunk: true,
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify('production'),
		}),
		new CleanWebpackPlugin(),
		new MiniCssExtractPlugin({
			filename: `css/[name].[contenthash].css`,
			chunkFilename: `css/[id].[contenthash].css`,
		}),
	],
	module: {
		rules: [
			{
				test: /\.(scss|css)$/,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
					},
					'sass-loader',
					{
						loader: 'sass-resources-loader',
						options: {
							resources: [
								resolve(__dirname, '../src/scss/_variables.scss'),
								resolve(__dirname, '../src/scss/_mixins.scss'),
							],
						},
					},
				],
			},
		],
	},
};
