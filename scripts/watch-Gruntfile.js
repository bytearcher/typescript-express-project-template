module.exports = function (grunt) {

    grunt.initConfig({

        exec: {
            build: 'bash scripts/build.sh',
            build_copy_views: 'bash scripts/build.sh copy_views',
            build_tsc: 'bash scripts/build.sh tsc',
            build_scss: 'bash scripts/build.sh css_sass_site css_autoprefix_n_minimize',
        },

        watch: {

            options: {
                spawn: false,
            },

            scss: {
                files: ['src/scss/**/*.scss'],
                tasks: ["exec:build_scss", "express:dev"]
            },
            pug: {
                files: ['src/views/**/*.pug'],
                tasks: ["exec:build_copy_views", "express:dev"]
            },
            ts: {
                files: ['src/**/*.ts'],
                tasks: ["exec:build_tsc", "express:dev"]
            },
            dummy_to_launch_live_reload: {
                options: {
                    livereload: true,
                    atBegin: true
                },
                files: [],
                tasks: ['express:dev']
            }
        },

        express: {
            options: {},
            dev: {
                options: {
                    script: 'dist/src/server.js'
                }
            }
        }
    });

    require('load-grunt-tasks')(grunt);

    grunt.registerTask('default', ['exec:build', 'watch']);
}
