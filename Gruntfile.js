module.exports = function config (grunt) {
    'use strict';

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            dist: {
                files: {
                    'dist/js/FloatingFormLabels.min.js': 'src/js/FloatingFormLabels.js'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('default', ['dist']);
    grunt.registerTask('dist', ['uglify:dist']);
};
