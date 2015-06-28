//

import gulp from 'gulp';

export default function (config) {
  var {base, src, cwd, dest } = config;

  function copyTask() {
    return gulp.src(src,
      {
        cwd,
        base,
        since: gulp.lastRun(copyTask.name)
      })
      .pipe(gulp.dest(dest));
  }

  copyTask.description = 'coping some files src->dest';

  return copyTask;
};
