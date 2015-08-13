var gulp = require('gulp');
var argv = require('yargs').argv,
    concat = require('gulp-concat'),
    connect = require('gulp-connect'),
    del = require('del'),
    inject = require('gulp-inject'),
    livereload = require('gulp-livereload'),
    modRewrite = require('connect-modrewrite'),
    runSequence = require('run-sequence').use(gulp),
    series = require('stream-series'),
    changed = require('gulp-changed'),
    _ = require('underscore');

var basePath = process.cwd();

var config = require(basePath+'/build.config.js');

var packageJSON = require(basePath+'/package.json');

var compiledJS,
    stylesBuildStream,
    stylesCompileStream,
    templates;

var appScriptsDest = config.buildDir+'src/',
    vendorScriptsDest = config.buildDir+'vendor/',
    buildAssetsDir = config.buildDir+'assets/',
    compileAssetsDir = config.compileDir+'assets/';

function templateStreams(){
    var html2JS = require('gulp-ng-html2js');
    return gulp.src(config.appFiles.tpl)
        .pipe(html2JS({
            moduleName: 'templates'
        }))
        .pipe(concat('templates.js'));
}

gulp.task('html2js', function(){
    templates = templateStreams()
        .pipe(gulp.dest(config.buildDir))
        .pipe(livereload());
});

function stylesStream(){
    var autoprefixer = require('gulp-autoprefixer'),
        merge = require('merge-stream'),
        recess = require('gulp-recess');
    var styles = merge(gulp.src(config.vendorFiles.css));
    if(config.appFiles.less){
        styles.add(
            gulp.src(config.appFiles.less)
                .pipe(concat('main.less'))
                .pipe(require('gulp-less')())
        );
    }
    if(config.appFiles.sass){
        styles.add(
            gulp.src(config.appFiles.sass)
                .pipe(require('gulp-sass')())
        );
    }
    return styles
        .pipe(autoprefixer({
            cascade: false,
            remove: false,
            browsers: config.appFiles.browsers
        }))
        .pipe(concat(packageJSON.name+'-'+packageJSON.version+'.css'))
        .pipe(recess({
            noIDs: false,
            noUnderscores: false,
            zeroUnits: false,
            strictPropertyOrder: false,
            noOverqualifying: false,
            noUniversalSelectors: false
        }))
        .pipe(recess.reporter());
}

gulp.task('buildStyles', function(){
    stylesBuildStream = stylesStream()
        .pipe(gulp.dest(buildAssetsDir))
        .pipe(livereload());
});

gulp.task('compileStyles', function(){
    var minifyCSS = require('gulp-minify-css');
    stylesCompileStream= stylesStream()
        .pipe(minifyCSS())
        .pipe(gulp.dest(compileAssetsDir));
});

gulp.task('index:build',['html2js', 'buildStyles'], function(){
    var jsVendSrc = gulp.src(config.vendorFiles.js)
        .pipe(gulp.dest(vendorScriptsDest));

    var jsAppSrc = gulp.src(config.appFiles.js)
        .pipe(gulp.dest(appScriptsDest));

    //order is important here
    return gulp.src(config.appFiles.html)
        .pipe(inject(stylesBuildStream, {ignorePath: config.buildDir, name: 'styles'}))
        .pipe(inject(
                series(jsVendSrc, jsAppSrc, templates),
                {ignorePath: config.buildDir, name: 'scripts'}
            ))
        .pipe(gulp.dest(config.buildDir))
        .pipe(livereload());
});

function removeLiveReload(){
    var es = require('event-stream');
    return es.map(function(data, cb){
        data.contents = new Buffer(String(data.contents).replace(/<script src="\/\/localhost:\d+\/livereload.js"><\/script>/, ''));
        cb(null, data);
    });
}

gulp.task ('index:compile', ['compileStyles','compileScripts'], function(){
    return gulp.src(config.appFiles.html)
        .pipe(removeLiveReload())
        .pipe(inject(stylesCompileStream, {ignorePath: config.compileDir, addRootSlash: false, name: 'styles'}))
        .pipe(inject(compiledJS, {ignorePath: config.compileDir, addRootSlash: false, name: 'scripts'}))
        .pipe(gulp.dest(config.compileDir));
});

gulp.task('compileScripts', function(){
    var ngAnnotate = require('gulp-ng-annotate'),
        uglify = require('gulp-uglify');
    compiledJS = series(
            gulp.src(config.vendorFiles.js),
            gulp.src('gulp-resources/module.prefix'),
            gulp.src(config.appFiles.js)
                .pipe(ngAnnotate()),
            templateStreams(),
            gulp.src('gulp-resources/module.suffix')
        )
        .pipe(concat(packageJSON.name+'-'+packageJSON.version+'.js'))
        .pipe(ngAnnotate())
        .pipe(uglify({output:{'ascii_only':true}}))
        .pipe(gulp.dest(compileAssetsDir));
});

gulp.task('copy:assets', function(){

    return gulp.src(_.union(config.appFiles.assets, config.vendorFiles.assets))
        .pipe(changed(buildAssetsDir))
        .pipe(gulp.dest(buildAssetsDir))
        .pipe(livereload());
});

gulp.task('copy:assetsCompile', function(){
    return gulp.src(_.union(config.appFiles.assets, config.vendorFiles.assets))
        .pipe(gulp.dest(compileAssetsDir));
});

gulp.task('copy:buildAppJS', function(){
    return gulp.src(config.appFiles.js)
        .pipe(changed(appScriptsDest))
        .pipe(gulp.dest(appScriptsDest))
        .pipe(livereload());
});

gulp.task('test', ['build'], function(){
    //TODO this doesn't work
    var mochaPhantom = require('gulp-mocha-phantomjs');
    return gulp.src('node_modules/grv-gulpfile/mocha/tests.html')
        .pipe(inject(
            gulp.src(_.union(config.vendorFiles.js,config.testFiles.js)),
            {addPrefix: "..", addRootSlash: false, name:'angular'}))
        .pipe(inject(
            gulp.src(config.appFiles.jsunit),
            {addPrefix: "..", addRootSlash: false,name:'tests'}))
        .pipe(gulp.dest(config.buildDir))
        .pipe(mochaPhantom({
            reporter: 'spec',
            phantomjs: {
                settings: {
                    webSecurityEnabled: false
                }
            }
        }))
});


var jsHintRules = {
    camelcase:true,
    curly:true,
    eqnull:true,
    freeze:true,
    immed:true,
    indent: 4,
    latedef:'nofunc',
    maxlen:140,
    newcap:true,
    noarg: true,
    noempty: true,
    nonbsp:true,
    nonew:true,
    trailing:true,
    unused: 'vars'
};


gulp.task('jshint',function(){
    var jshint = require('gulp-jshint');
    return gulp.src(_.union(
            ['gulpfile.js'],
            config.appFiles.js,
            config.appFiles.jsunit,
            ['!src/common/thirdparty/**']
       ))
       .pipe(jshint(jsHintRules))
       .pipe(jshint.reporter('default'));
});

gulp.task('cleanBuild', function(cb) {
    del([config.buildDir], cb);
});

gulp.task('cleanCompile', function(cb) {
    del([config.compileDir], cb);
});

gulp.task('clean', ['cleanBuild','cleanCompile']);

gulp.task('setupWatchers', function(){
    var watchArr = [
        gulp.watch(_.union(config.appFiles.js, ['!**/node_modules/**']), ['jshint', 'copy:buildAppJS']),
        gulp.watch(config.appFiles.assets, ['copy:assets']),
        gulp.watch(config.appFiles.html, ['index:build']),
        gulp.watch(config.appFiles.tpl, ['html2js']),
        gulp.watch(_.union(config.vendorFiles.css,config.appFiles.sass,config.appFiles.less), ['buildStyles'])
    ];
    watchArr.map(function(watcher){
        watcher.on('change', function(event){
            if (event.type === 'added'){
                watcher.add(event.path);
                runSequence('index:build');
            };
            if(event.type === 'deleted'){
                watcher.remove(event.path);
                runSequence('index:build');
            };
        });
    });
});

gulp.task('watch', function(){
    runSequence('build','setupWatchers','connect:'+(argv.server || config.defaultServer));
});

gulp.task('startStubby', function(cb){
    var stubby = require('gulp-stubby-server');
    stubby({
        stubs: 8882,
        tls: 8443,
        admin: 8010,
        mute: false,
        watch: 'mocks/mocks.yaml',
        files: ['mocks/mocks.yaml']
    }, cb);
});

_.each(config.server,function(server, name){
    gulp.task('connect:'+name, function(){
        if (server.runStubby){
            runSequence('startStubby');
        }
        connect.server({
            root: config.buildDir,
            port: 9002,
            host: server.host,
            middleware: function(){
                return [modRewrite(server.modRewrite)];
            }
        });
        livereload.listen({
            basePath: config.buildDir,
            port: 9009
        });
    });
});

gulp.task('build', ['jshint'],function(cb){
    runSequence('cleanBuild',['copy:assets', 'index:build'], cb);
});

gulp.task('compile', function(cb){
    runSequence('cleanCompile',['copy:assetsCompile', 'index:compile'],cb);
});

gulp.task('default', ['watch']);
