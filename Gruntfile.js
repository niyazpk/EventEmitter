module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        jshint: {
            options: '<%= pkg.jshintConfig %>',
            all: ['<%= pkg.name %>.js']
        },

        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: '<%= pkg.name %>.js',
                dest: 'build/<%= pkg.name %>.min.js'
            }
        },

        jsdoc: {
            dist: {
                src: ['<%= pkg.name %>.js'],
                options: {
                    destination: 'doc'
                }
            }
        },

        watch: {
            scripts: {
                files: ['<%= pkg.name %>.js'],
                tasks: ['jshint'],
                options: {
                    spawn: false,
                },
            },
        }
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-jsdoc');

    // Default task(s).
    grunt.registerTask('default', ['uglify']);

};