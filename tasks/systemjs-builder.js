//

import Builder from 'systemjs-builder';
console.log(Builder);
export default function (config) {

  function copyTask() {
    return gulp.src(config.src,
      { since: gulp.lastRun(copyTask.name) })
      .pipe(gulp.dest(config.dest));
  }

  copyTask.description = 'coping some files src->dest';

  return copyTask;
};
