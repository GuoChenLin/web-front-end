var deploy = require("gulp-gh-pages");
var options = { 
    remoteUrl: "https://github.com/gzdaijie/web-front-end.git",
    branch: "gh-pages"};
gulp.task('deploy', function () {
    gulp.src("dist/**/*.*")
        .pipe(deploy(options));
});