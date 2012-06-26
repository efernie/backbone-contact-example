
/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: 'server/package.json',
    meta: {
      banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
        '<%= pkg.homepage ? "* " + pkg.homepage + "\n" : "" %>' +
        '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
        ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */'
    },
    // lint: {
    //   files: ['grunt.js', 'server/index.js']//'server/**/*.js', 'client/**/*.js']
    // },
    // qunit: {
    //   files: ['test/**/*.html']
    // },
    concat: {
      dist: {
        src: ['<banner:meta.banner>', '<file_strip_banner:lib/<%= pkg.name %>.js>'],
        dest: 'dist/<%= pkg.name %>.js'
      }
    },
    min: {
      dist: {
        src: ['<banner:meta.banner>', '<config:concat.dist.dest>'],
        dest: 'dist/<%= pkg.name %>.min.js'
      }
    },
    watch: {
      files: '<config:lint.files>',
      tasks: 'lint qunit'
    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        laxcomma: true,
        browser: true,
        node: true
      },
      globals: {
        jQuery: true
      }
    },
    uglify: {}
  });

  // RequireJS Config
  requirejs: {
    mainConfigFile: "client/src/config.js",
    out: "dist/debug/require.js",
    name: "config",
    wrap: false
  };

  // Load outside npmtasks
  grunt.loadNpmTasks('grunt-requirejs');

  // Default task.
  grunt.registerTask('default', 'concat min');

};


