module.exports = {
	extends: ['next', 'prettier'],
	plugins: ['@typescript-eslint', 'prettier'],
	rules: {
		'prettier/prettier': 'error',
		'@next/next/no-html-link-for-pages': 'off',
	},
	parser: '@typescript-eslint/parser',
	parserOptions: {
		project: './tsconfig.json',
	},
};
