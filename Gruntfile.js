module.exports = function config (grunt) {
    'use strict';

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
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
            dist: {
                files: {
                    'dist/js/floatingFormLabels.min.js': 'src/js/floatingFormLabels.js'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-eslint');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('default', ['dist']);
    grunt.registerTask('dist', ['eslint', 'uglify:dist']);
};
