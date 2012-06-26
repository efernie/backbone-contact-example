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
    lint: {
      files: [
          'grunt.js'
        , 'lib/*.js'
        , 'index.js'
        , '../client/src/*/*.js'
        , '../client/src/fernsworld.js'
        , '../client/src/main.js'
        , '../client/src/config.js'
      ]
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
        es5: true,
        scripturl: true,
        node: true
      },
      globals: {
        jQuery: true,
        define: true
      }
    },
    uglify: {},

    requirejs: {
      // This is to push everything into one file
      baseUrl: '../client/src',
      mainConfigFile: "../client/src/config.js",
      out: "../client/src/fernsworldAll.js",
      name: 'config'

      //baseUrl: 'src',
      //appDir: '../client',
      //dir: '../build',
      //name: "config",
      //wrap: false
    }
  });

  // Load outside npmtasks
  grunt.loadNpmTasks('grunt-requirejs');

  // Default task.
  grunt.registerTask('default', 'lint requirejs');

};


