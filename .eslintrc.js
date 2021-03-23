module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: ['airbnb-base', 'p5js'],
	parser: 'babel-eslint',
	parserOptions: {
		ecmaVersion: 12,
		sourceType: 'module',
	},
	rules: {
		indent: ['warn', 'tab', { SwitchCase: 1 }],
		'linebreak-style': ['warn', 'windows'],
		'no-tabs': 0,
		'no-unused-vars': 'warn',
		'max-len': ['error', { code: 120 }],
		'no-param-reassign': 0,
		'new-cap': 'warn',
		'import/extensions': [
			'error',
			'ignorePackages',
			{
				js: 'always',
			},
		],
	},
};
