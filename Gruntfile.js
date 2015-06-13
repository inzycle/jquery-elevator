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
        concat: {
            dist: {
                options: {
                    banner: banner
                },
                files: {
                    "dist/jquery.elevator.js": [ "src/*.js" ]
                }
            }
        },
        uglify: {
            options: {
                preserveComments: false,
                banner: banner
            },
            dist: {
                files: {
                    "dist/jquery.elevator.min.js": "dist/jquery.validate.js"
                }
            },
            all: {
                expand: true,
                src: "**/*.js",
                ext: ".min.js"
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks("grunt-contrib-concat");
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask("default", ["concat", "jshint"]);
    grunt.registerTask("release", ["default", "uglify"]);
    grunt.registerTask("start", ["concat", "watch"]);


};