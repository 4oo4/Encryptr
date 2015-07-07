/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    meta: {
      banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %>' + '\n' +
        '<%= pkg.homepage ? "* " + pkg.homepage : "" %>' + '\n' +
        ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author %>;' + '\n' +
        ' * License: <%= _.pluck(pkg.licenses, "type").join(", ") %> (<%= _.pluck(pkg.licenses, "url").join(", ") %>)' + '\n' +
        ' */\n\n'
    },
    concat: {
      options: {
        banner:  '<%= meta.banner %>' + '// GENERATED FILE - DO NOT EDIT\n\n' +
          'window.app = { version: "<%= pkg.version %>" };\n\n'
      },
      dist: {
        src: ['src/**/*.js'],
        dest: 'www/js/<%= pkg.name %>.js'
      },
      zepto: {
        src: [
          'components/zepto/src/zepto.js',
          'components/zepto/src/ajax.js',
          'components/zepto/src/assets.js',
          'components/zepto/src/callbacks.js',
          'components/zepto/src/data.js',
          'components/zepto/src/detect.js',
          'components/zepto/src/deferred.js',
          'components/zepto/src/event.js',
          'components/zepto/src/form.js',
          'components/zepto/src/fx.js',
          'components/zepto/src/fx_methods.js',
          'components/zepto/src/gesture.js',
          'components/zepto/src/polyfill.js',
          'components/zepto/src/selector.js',
          'components/zepto/src/stack.js',
          'components/zepto/src/touch.js'
        ],
        dest: 'www/components/zepto/zepto.js'
      },
      tests: {
        options: {
          banner: '<%= meta.banner %>'
        },
        src: [
          'tests/**/*.js'
        ],
        dest: 'www/js/<%= pkg.name %>-tests.js'
      }
    },
    copy: {
      main: {
        files: [
          {expand: true, flatten: true, src: ['components/font-awesome/css/*'], dest: 'www/components/font-awesome/css/'},
          {expand: true, flatten: true, src: ['components/font-awesome/fonts/*'], dest: 'www/components/font-awesome/fonts/'},
          {expand: true, flatten: true, src: ['components/moment/moment.js'], dest: 'www/components/moment/'},
          {expand: true, flatten: true, src: ['node_modules/semver/semver.browser.js'], dest: 'www/components/semver'},
          {expand: true, flatten: true, src: ['components/underscore/underscore*.js'], dest: 'www/components/underscore/'},
          {expand: true, flatten: true, src: ['components/backstack/backstack*.js'], dest: 'www/components/backstack/'},
          {expand: true, flatten: true, src: ['components/backbone/backbone*.js'], dest: 'www/components/backbone/'},
          {expand: true, flatten: true, src: ['components/offline-js/offline.min.js'], dest: 'www/components/offline-js/'},
          {expand: true, flatten: true, src: ['components/offline-js/themes/offline-theme-default.css'], dest: 'www/components/offline-js/themes/'},
          {expand: true, flatten: true, src: ['components/fastclick/lib/fastclick.js'], dest: 'www/components/fastclick/'}
        ]
      }
    },
    mochaTest: {
      test: {
        options: {
          reporter: 'spec',
          slow: 1000
        },
        timeout: 10e3,
        src: ['functional-tests/*.js']
      }
    },
    uglify: {
      dist: {
        src: [
          '<%= concat.dist.dest %>'
        ],
        dest: 'www/js/<%= pkg.name %>.min.js'
      },
      zepto: {
        src: [
          'www/components/zepto/zepto.js'
        ],
        dest: 'www/components/zepto/zepto.min.js'
      }
    },
    watch: {
      files: [
        '<%= jshint.files %>'
      ],
      tasks: ['jshint', 'concat', 'min']
    },
    shell: {
      _options: {
        failOnError: true,
        stdout: true
      },
      debug_ios: {
        command: './node_modules/.bin/cordova -d emulate ios'
      },
      debug_android: {
        command: './node_modules/.bin/cordova -d run android'
      },
      debug_blackberry10: {
        command: './node_modules/.bin/cordova -d emulate blackberry10'
      },
      // Some different reporters...
      mochaspec: {
        command:
          './node_modules/.bin/mocha-phantomjs www/tests.html',
        options: {
          failOnError: true,
          stdout: true
        }
      },
      mochamin: {
        command:
          './node_modules/.bin/mocha-phantomjs -R min www/tests.html',
        options: {
          failOnError: true,
          stdout: true
        }
      },
      mochadot: {
        command:
          './node_modules/.bin/mocha-phantomjs -R dot www/tests.html',
        options: {
          failOnError: true,
          stdout: true
        }
      },
      mochatap: {
        command:
          './node_modules/.bin/mocha-phantomjs -R tap www/tests.html',
        options: {
          failOnError: true,
          stdout: true
        }
      }
    },
    nodewebkit: {
      // This has a mishmash of old and new options just for compatibility
      release: {
        options: {
          version: '0.11.5',
          build_dir: './desktopbuilds',
          mac: true,
          mac_icns: './resources/icon-encryptr.icns',
          macIcns: './resources/icon-encryptr.icns',
          mac_bundle_id: 'org.devgeeks.encryptr',
          macPlist: {
            CFBundleIdentifier: 'org.devgeeks.encryptr'
          },
          cacheDir: './desktopbuilds/cache',
          winIco: './resources/icon-encryptr.ico',
          win: true,
          linux32: true,
          linux64: true,
          credits: './www/credits.html',
          macCredits: './www/credits.html'
        },
        src: ['./www/**/*'] // Your node-webkit app
      },
      // Don't try and force wine icon replacement on debug builds
      debug: {
        options: {
          version: '0.11.5',
          build_dir: './desktopbuilds',
          mac: true,
          mac_icns: './resources/icon-encryptr.icns',
          macIcns: './resources/icon-encryptr.icns',
          mac_bundle_id: 'org.devgeeks.encryptr',
          macPlist: {
            CFBundleIdentifier: 'org.devgeeks.encryptr'
          },
          cacheDir: './desktopbuilds/cache',
          win: true,
          linux32: true,
          linux64: true,
          credits: './www/credits.html',
          macCredits: './www/credits.html'
        },
        src: ['./www/**/*'] // Your node-webkit app
      }
    },
    jshint: {
      files: ['Gruntfile.js', 'src/*.js', 'src/**/*.js'],
      options: {
        eqeqeq: false,
        laxbreak: true,
        undef: true,
        newcap: true,
        noarg: true,
        strict: false,
        trailing: true,
        onecase: true,
        boss: true,
        eqnull: true,
        onevar: false,
        evil: true,
        regexdash: true,
        browser: true,
        wsh: true,
        sub: true,
        globals: {
          cordova: true
        }
      }
    },
    dot: {
      dist: {
        options: {
          variable  : 'tmpl',
          requirejs : false
        },
        src  : ['tpl/**/*.html'],
        dest : 'www/js/<%= pkg.name %>-templates.js'
      }
    }
  });

  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-dot-compiler');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-mocha-test');

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-node-webkit-builder');


  // Custom tasks
  grunt.registerTask('test', 'Do mocha test, default spec', function(which) {
    grunt.task.run('jshint', 'dot', 'copy', 'concat', 'min');
    grunt.task.run('shell:mocha' + (which || 'spec'));
  });
  grunt.registerTask('desktop', 'Build for desktop', function(which) {
    grunt.task.run('jshint', 'dot', 'copy', 'concat', 'min', 'shell:mochadot');
    if (which === 'release') {
      grunt.task.run('nodewebkit:release');
    } else {
      grunt.task.run('nodewebkit:debug');
    }
  });
  grunt.registerTask('min', ['uglify']); // polyfil for uglify
  grunt.registerTask('debug','Create a debug build', function(platform) {
    grunt.task.run('jshint', 'dot', 'copy', 'concat', 'min', 'shell:mochadot');
    if (platform === 'desktop') {
      grunt.task.run('nodewebkit:debug');
    } else {
      grunt.task.run('shell:debug_' + platform);
    }
  });

  // Default task
  grunt.registerTask('default', ['jshint', 'dot', 'copy', 'concat', 'min', 'shell:mochaspec']);
  grunt.registerTask('yolo', ['jshint', 'dot', 'copy', 'concat', 'min']);


};
