module.exports = function(grunt) {

    'use strict';

    var banner;

    banner = "/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - " +
                "<%= grunt.template.today('yyyy/m/d') %>\n" +
                " * <%= pkg.homepage %>\n" +
                " * Copyright (c) <%= grunt.template.today('yyyy') %> <%= pkg.author.name %>;\n" +
                " * Licensed <%= _.pluck(pkg.licenses, 'type').join(', ') %> */\n";

    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        jshint: {
            files: ['Gruntfile.js', 'src/*.js', 'test/*.js'],
            options: {
                globals: {
                    jQuery: true
                }
            }
        },
        watch: {
            files: ['<%= jshint.files %>'],
            tasks: ['jshint']
        },
        uglify: {
            options: {
                preserveComments: false,
                banner: banner
            },
            dist: {
                files: {
                    "dist/jquery.elevator.min.js": "dist/jquery.elevator.js"
                }
            }
        },
        cssmin: {
            options: {
                shorthandCompacting: false,
                roundingPrecision: -1
            },
            target: {
                files: {
                    'dist/jquery.elevator.min.css': ['src/jquery.elevator.css']
                }
            }
        },
        copy: {
            main: {
                files: [{
                    expand: true,
                    cwd: 'src/',
                    src: ['**'],
                    dest: 'dist/'
                }]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask("default", ["jshint"]);
    grunt.registerTask("release", ["copy", "cssmin", "default", "uglify"]);
    grunt.registerTask("start", ["watch", "default"]);


};