/*
const gulp = require('gulp');
// 걸프 의존성을 여기 씁니다.

gulp.task('default', function(done) {
    // 걸프 작업을 여기 씁니다.

    done();
});
*/

var gulp = require("gulp");
var babel = require("gulp-babel");
var eslint = require("gulp-eslint")

gulp.task("default", function (done) {
  // ESLint 실행
  gulp.src(["es6/**/*.js", "public/es6/**/*.js"])
      .pipe(eslint())
      .pipe(eslint.format());

  // 노드 소스
  gulp.src("es6/**/*.js")
      .pipe(babel())
      .pipe(gulp.dest("dist"));

  // 브라우저 소스
  gulp.src("public/es6/**/*.js")
      .pipe(babel())
      .pipe(gulp.dest("public/dist"));

/*return gulp.src("src/app.js")
            .pipe(babel())
            .pipe(gulp.dest("dist"));*/

  done();
  /*
    The following tasks did not complete: default
    Did you forget to signal async completion?
    => 버전 업데이트 이후로 promise 필요, done 의미 없는 함수 실행
  */
});
