/**
 * RequireJS paths for the adaptive bundle
 */

require.config({
    'baseUrl': '.',
    'keepBuildDir': true,
    'paths': {
        'buildConfig': '../build/buildConfig',
        'translator': 'global/i18n/translator',
        'includes': 'global/includes/',
        'libs': '../node_modules',
        'package': '../package.json',
        'resizeImages': '../node_modules/imageresize-client/resizeImages',
        'descript': '../node_modules/descript/dist/descript',
        'baseSelectorLibrary': 'vendor/jquery',
    },
    'shim': {
        'baseSelectorLibrary': {
            'exports': 'jQuery'
        }
    }
});
