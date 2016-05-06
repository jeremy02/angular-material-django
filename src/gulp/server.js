'use strict';

/*var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');

var browserSync = require('browser-sync');
var browserSyncSpa = require('browser-sync-spa');

var util = require('util');

var proxyMiddleware = require('http-proxy-middleware');
*/

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');

var browserSync = require('browser-sync');
var browserSyncSpa = require('browser-sync-spa');

var util = require('util');

var proxyMiddleware = require('http-proxy-middleware');


var jshint = require('gulp-jshint'),
    source = require('vinyl-source-stream'),
    //browserify = require('browserify'),
    concat = require('gulp-concat'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    refresh = require('gulp-livereload'),
    nodemon = require('gulp-nodemon');
var livereload = require('gulp-livereload');

//var exec = require('child_process').exec;
//var proc = exec('python manage.py runserver');


'use strict';

/*var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');

var browserSync = require('browser-sync');
var browserSyncSpa = require('browser-sync-spa');

var util = require('util');

var proxyMiddleware = require('http-proxy-middleware');
*/

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');

var browserSync = require('browser-sync');
var browserSyncSpa = require('browser-sync-spa');

var util = require('util');

var proxyMiddleware = require('http-proxy-middleware');


var jshint = require('gulp-jshint'),
    source = require('vinyl-source-stream'),
    //browserify = require('browserify'),
    concat = require('gulp-concat'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    refresh = require('gulp-livereload'),
    nodemon = require('gulp-nodemon');
var livereload = require('gulp-livereload');

//var exec = require('child_process').exec;
var process     = require('child_process')


var BROWSER_SYNC_RELOAD_DELAY = 500;

function browserSyncInit(baseDir, browser)
{
    browser = browser === undefined ? 'default' : browser;

    var routes = null;
    if ( baseDir === conf.paths.src || (util.isArray(baseDir) && baseDir.indexOf(conf.paths.src) !== -1) )
    {
        routes = {
            '/bower_components': 'bower_components'
        };
    }

    var server = {
        baseDir: baseDir,
        routes : routes
    };

    /*
     * You can add a proxy to your backend by uncommenting the line below.
     * You just have to configure a context which will we redirected and the target url.
     * Example: $http.get('/users') requests will be automatically proxified.
     *
     * For more details and option, https://github.com/chimurai/http-proxy-middleware/blob/v0.9.0/README.md
     */
    // server.middleware = proxyMiddleware('/users', {target: 'http://jsonplaceholder.typicode.com', changeOrigin: true});

    /*browserSync.instance = browserSync.init({
        startPath: '/',
        server   : server,
        browser  : browser,
        port:8000,
        logPrefix: "THE IKOCLASS PROJECT"

        //browser: ["google chrome", "firefox"]
        /*socket: {
            domain: 'localhost:3000'
        }*/
    //});


    browserSync.instance = browserSync.init({
        startPath: '/',
        server   : server,
        browser  : browser,
        port:8000,
        logPrefix: "THE FFS PROJECT",
        //proxy: '192.168.1.43',
        //proxy: {
            //target: "localhost:8000",
        //},
        host : '52.33.44.21'

        //browser: ["google chrome", "firefox"]
        /*socket: {
            domain: 'localhost:3000'
        }*/
    });

}

browserSync.use(browserSyncSpa({
    selector: '[ng-app]'// Only needed for angular apps
}));

gulp.task('serve', ['watch'], function ()
{
    browserSyncInit([path.join(conf.paths.tmp, '/serve'), conf.paths.src]);

    var spawn = process.spawn;
    console.info('Starting flask server');
    var PIPE = {stdio: 'inherit'};
    spawn('python', ['flexcomm/manage.py','runserver','0:3002'], PIPE);


});

gulp.task('serve:dist', ['build'], function ()
{
    browserSyncInit(conf.paths.dist);
});

gulp.task('serve:e2e', ['inject'], function ()
{
    browserSyncInit([conf.paths.tmp + '/serve', conf.paths.src], []);
});

gulp.task('serve:e2e-dist', ['build'], function ()
{
    browserSyncInit(conf.paths.dist, []);
});

