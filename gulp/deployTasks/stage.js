var gulp        = require('gulp');
var awspublish  = require( 'gulp-awspublish' );
var rename      = require("gulp-rename")
var p           = require('../../package.json');

gulp.task("3vot-stage", ['3vot-stage-1', '3vot-stage-2', ])

gulp.task("3vot-stage-1",  function(){
  global.previewUrl = process.env["VOT_STAGE_URL"] + "/"+process.env["VOT_STAGE_PROFILE"]+"/"  + p.name  + "_" + p.version;
})

gulp.task('3vot-stage-2', ['3vot-stage-1','dist'], function() {
  
  var publisher = awspublish.create({ 
    key: process.env["AWS_ACCESS_KEY_ID"],
    secret: process.env["AWS_SECRET_ACCESS_KEY"], 
    bucket: process.env["VOT_STAGE_BUCKET"]
  });

  // define custom headers
  var headers = { 'Cache-Control': 'max-age=100, no-transform, public' };

  return gulp.src( "./dist/**/*" )
    .pipe(rename(function (path) {
      path.dirname = '/' + process.env["VOT_STAGE_PROFILE"]+"/"  + p.name  + "_" + p.version + "/" + path.dirname
    }))
    .pipe(publisher.publish(headers, { force: true }))
    .pipe(awspublish.reporter());  
});
