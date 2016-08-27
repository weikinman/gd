module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            foo: {
                src: ['src/aa.js', 'src/aaa.js']
            },
        },
        concat: {
            foo: {
                files: {
                    'dest/a.js': ['src/aa.js', 'src/aaa.js'],
                    'dest/a1.js': ['src/aa1.js', 'src/aaa1.js'],
                },
            },
            bar: {
                files: {
                    'dest/b.js': ['src/bb.js', 'src/bbb.js'],
                    'dest/b1.js': ['src/bb1.js', 'src/bbb1.js'],
                },
            },
        },
        uglify: {

            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: 'src/<%= pkg.name %>.js',
                dest: 'build/<%= pkg.name %>.min.js'
            }
        }
    });

    // 加载包含 "uglify" 任务的插件。
    grunt.loadNpmTasks('grunt-contrib-uglify');

    // 默认被执行的任务列表。
    grunt.registerTask('default', ['uglify']);

};