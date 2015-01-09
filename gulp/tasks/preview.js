var gulp = require('gulp');
var execSync = require('exec-sync');
var p = require('../../package.json');

gulp.task('clear-server', ['dist'], function() {
    return execSync('gsutil -m rm "' + p.publishUrl, true);
});

gulp.task('push-server', ['clear-server'], function() {
    return execSync('gsutil -m cp -R ./dist/* ' + p.publishUrl, true);
});

gulp.task('make-private', ['push-server'], function() {
    return execSync('gsutil acl set private "' + p.publishUrl + '"index.html', true);
});

gulp.task('preview', ['make-private'], function() {
    return execSync('gsutil -m acl ch -R -g fusion.net:R -u kit@kitx.net:R "' + p.publishUrl + 'index.html"', true);
});