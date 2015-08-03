//

import gulp from 'gulp';
import babel from 'gulp-babel';

export default function (config) {
  const {src, cwd, dest, base} = config;
  return function babelify() {
    return gulp.src(src, {
      cwd,
      base,
      since: gulp.lastRun(babelify)
    })
      .pipe(babel())
      .on('error', (e) => console.error(e && e.stack))
      .pipe(gulp.dest(dest));
  };
}
