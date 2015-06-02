module.exports = function (grunt) {

    grunt.initConfig({
        package: grunt.file.readJSON('package.json'),
        concat: {
            'dist': {
                src: ['src/jquery.elevator.js'],
                dest: 'dist/jquery.elevator.js'
            }
        },
        uglify: {
            'dist': {
                src: 'dist/jquery.elevator.js',
                dest: 'dist/jquery.elevator.min.js'
            }
        },
        jshint: {
            options: { jshintrc: true },
            all: [
                'Gruntfile.js',
                'src/*.js',
                'test/*.js'
            ]
        },
        watch: {
            js: {
                files: [
                    'src/*.js',
                    'test/*.js'
                ],
                tasks: [
                    'compile',
                    'minify'
                ]
            },
            css: {
                files: [
                    'src/*.css'
                ],
                tasks: [
                    'compile',
                    'minify'
                ]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('default', ['compile', 'minify']);
    grunt.registerTask('compile', ['concat:dist']);
    grunt.registerTask('minify', ['uglify']);

};