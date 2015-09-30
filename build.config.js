/**
 * This file/module contains all configuration for the build process.
 */
module.exports = {

  buildDir: 'build/',
  compileDir: 'bin/',

  appFiles: {
    js: [ 'src/**/*.js', '!src/**/*.spec.js', '!src/assets/**/*.js' ],
    jsunit: [ 'src/**/*.spec.js' ],
    tpl: [ 'src/**/*.tpl.html'],
    assets: ['src/assets/**'],
    html: ['src/index.html'],
    less: ['src/**/*.less']
  },

  testFiles: {
    js: []
  },

  vendorFiles: {
    js: [
      'vendor/angular/angular.js',
      'vendor/ui-router/release/angular-ui-router.js',
      'vendor/angular-animate/angular-animate.js',
      'vendor/angular-aria/angular-aria.js',
      'vendor/angular-material/angular-material.js',
      'node_modules/angular-material-icons/angular-material-icons.min.js'
    ],
    css: [
      'vendor/angular-material/angular-material.css'
    ],
    assets: [
    ]
  },

  defaultServer: 'mock',
  server: {
    mock: {
        host: '127.0.0.1',
        runStubby: true,
        modRewrite: ['^/service/(.*)$ http://127.0.0.1:8882/service/$1 [P]']
    },
  /* Example of local server 
    local: {
        host: '127.0.0.1',
        modRewrite: ['^/service/(.*)$ http://127.0.0.1:8080/service/$1 [P]']
    }
*/
  }
};
