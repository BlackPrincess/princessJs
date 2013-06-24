module.exports = function(grunt) {
    'use strict';
 
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
 
        concat: {
			core: {
				src: [ 'src/*.js', 'src/util/*.js'],
                dest: 'build/<%= pkg.name %>.js'
			},
            extend: {
                src: [ 'src/extend/*.js'],
                dest: 'build/<%= pkg.nameExtend %>.js'
            }
        },
 
        uglify: {
			options: {
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
			},
			core: {
				src: 'build/<%= pkg.name %>.js',
				dest: 'build/<%= pkg.name %>.min.js',
			},
			extend: {
				src: 'build/<%= pkg.nameExtend %>.js',
				dest: 'build/<%= pkg.nameExtend %>.min.js',
			}
        },
        jshint: {
            files: ['src/**/*.js'],
            options: {
                jshintrc: '.jshintrc'
            }

        }
    });
 
    // Load grunt tasks from NPM packages
    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
 
    // Default grunt
    grunt.registerTask('build', [ 'jshint', 'concat', 'uglify' ]);
 
};