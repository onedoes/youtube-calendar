//

import gulp from 'gulp';
import path from 'path';
import del from 'promised-del';

import copy from './tasks/copy';
import server from './tasks/server';
import systemjsBuilder from './tasks/systemjs-builder';

////

const config = {
  srcFolder: 'src',
  outFolder: 'out',

  get serviceWorkerIndex() {
    return path.join(this.srcFolder, 'sw/index.js');
  }
};

////

function delOutputFolderTask(){
  return del(['out']);
}

const serverTask = server(config);

const copyNodeStuffTask = copy({
  src: ['node_modules/babel-core/browser-polyfill.min.js'],
  dest: config.outFolder
});

const copySrcStuffTask = copy({
  cwd: config.srcFolder,
  base: config.srcFolder,
  src: [
    '**/*.html',
    '!index.html',
    'icons/**/*'
  ],
  dest: config.outFolder
});

const serviceWorkerBuildingTask = systemjsBuilder({
  src: config.serviceWorkerIndex,
  dest: config.outFolder
});

////

gulp.task(serverTask);
gulp.task(delOutputFolderTask);
gulp.task(copyNodeStuffTask);
gulp.task(copySrcStuffTask);
gulp.task(serviceWorkerBuildingTask);

gulp.task('default', gulp.series(
  delOutputFolderTask,
  gulp.parallel(
    copyNodeStuffTask,
    copySrcStuffTask,
    serverTask
  )
));

