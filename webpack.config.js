const path = require('path');

module.exports = {
	mode: 'development',
	entry: './src/game.js',
	watch: true,
	output: {
		filename: 'game.js',
		path: path.resolve(__dirname, 'dist'),
	},
	watchOptions: {
		ignored: /node_modules/,
	},
};
