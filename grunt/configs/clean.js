module.exports = {
	built: [
		'bower_components',
		'vendor',
		'wp-theme/assets/_precompiled',
		'wp-theme/assets/_src/**/vendor',
		'www'
	],
	wp: [
		'www',
		'db',
		'uploads'
	],
	reset: [
		'site_config.json',
		'site_config.local.json'
	]
};