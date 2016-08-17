module.exports = function config (grunt) {
    'use strict';

    var pkg = grunt.file.readJSON('package.json'),
        banner = '/*!**************************************************************\n' +
            ' * Package: <%= pkg.name %>\n' +
            ' * Version: v<%= pkg.version %>\n' +
            ' * Built  : <%= Date() %>\n' +
            ' * URL  : https://github.com/Baedda/floating-form-labels\n' +
            ' ***************************************************************/\n';

    grunt.initConfig({
        pkg: pkg,
        eslint: {
            options: {
                configFile: '.eslintrc',
            },
            target: [
                'Gruntfile.js',
                'src/js/*.js',
                'src/js/**/*.js'
            ]
        },
        uglify: {
            options: {
                banner: banner
            },
            dist: {
                files: {
                    'dist/floatingFormLabels.min.js': 'js/floatingFormLabels.js'
                }
            }
        },
    });

    grunt.loadNpmTasks('grunt-eslint');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('default', ['dist']);
    grunt.registerTask('dist', ['eslint', 'uglify:dist']);
};
