module.exports = function(grunt) {
    return {
        styleguide: {
            files: [
                'app/**/*.scss',
                'styleguide/**/*.js',
                'styleguide/**/*.scss',
                '!styleguide/build/**',
                'styleguide/**/*.dust',
                'app/**/*.dust'
            ],
            tasks: [
                'adaptive-compile-css',
                'sass:styleguide',
                'requirejs:styleguide'
            ]
        }
    };
};
