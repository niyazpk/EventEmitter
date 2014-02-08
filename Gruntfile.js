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

        mocha: {
            test: {
                src: ['tests/**/*.html'],
                options: {
                    run: true,
                    reporter: 'Spec'
                }
            },
        },

        mochaTest: {
            test: {
                options: {
                    reporter: 'spec'
                },
                src: ['*.js']
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

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-mocha');
    grunt.loadNpmTasks('grunt-mocha-test');
    grunt.loadNpmTasks('grunt-jsdoc');

    // Default task(s).
    grunt.registerTask('default', ['jshint', 'uglify']);
    grunt.registerTask('test', ['mocha', 'mochaTest']);

};