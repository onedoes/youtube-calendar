//

import gulp from 'gulp';
import sass from 'gulp-sass';

export default function (config) {
  const {cwd, dest, src} = config;
  return function scssTask() {
    return gulp.src(src, {cwd})
      .pipe(sass({
        outputStyle: 'expanded',
        precision: 3
      }).on('error', sass.logError))
      .pipe(gulp.dest(dest));
  };
}
