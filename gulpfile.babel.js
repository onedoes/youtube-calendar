//

import chokidar from 'chokidar';
import gulp from 'gulp';
import path from 'path';
import del from 'promised-del';
import debounce from 'lodash.debounce';

import copy from './tasks/copy';
import babelify from './tasks/babelify';
import inject from './tasks/inject';
import scss from './tasks/scss';
import serverInitTask, {server as browser} from './tasks/server';
import systemjsBuilder from './tasks/systemjs-builder';

import hideStackFramesFrom from 'hide-stack-frames-from';

////

hideStackFramesFrom('babel-core', 'gulp', 'gulp-cli', 'gulp-babel');

const config = {
  srcFolder: 'src',
  outFolder: 'out',
  srcFilesToCopy: [
    '**/*.html',
    '!sw/**/*',
    'icons/**/*'
  ]
};

////

const babelTask = babelify({
  cwd: config.srcFolder,
  base: config.srcFolder,
  src: [
    '**/*.js',
    '!sw/**/*'
  ],
  dest: config.outFolder
});

function delOutputFolderTask() {
  return del(['out']);
}

const serverTask = serverInitTask(config);

const copyNodeStuffTask = copy({
  src: [
    'node_modules/babel-core/browser-polyfill.min.js',
    'jspm_packages/es6-module-loader.js',
    'jspm_packages/system.src.js',
    'jspm.config.js'
  ],
  dest: config.outFolder
});

const copySrcStuffTask = copy({
  cwd: config.srcFolder,
  base: config.srcFolder,
  src: config.srcFilesToCopy,
  dest: config.outFolder
});

const injectTask = inject({
  src: 'index.html',
  cwd: config.outFolder,
  dest: config.outFolder,

  syncInjection: [
    'critical.css',

    'browser-polyfill.min.js',
    'es6-module-loader.src.js',
    'system.src.js',
    'jspm.config.js'
  ],
  asyncInjection: [
    'critical.js'
  ]
});

const scssTask = scss({
  src: '**/*.scss',
  cwd: config.srcFolder,
  dest: config.outFolder
});

const serviceWorkerBuildingTask = systemjsBuilder({
  src: 'index',
  cwd: config.srcFolder + '/sw',
  dest: config.outFolder + '/sw.js',
  isInSFXMode: true,
  builderOptions: { sfxFormat: 'es6' }
});

////

gulp.task(delOutputFolderTask);
gulp.task(injectTask);
gulp.task(serverTask);
gulp.task(copyNodeStuffTask);
gulp.task(copySrcStuffTask);
gulp.task(serviceWorkerBuildingTask);

gulp.task('watch', function () {
  const cwd = config.srcFolder;
  const defaultChokidarOpts = { cwd, ignoreInitial: true}

  const watch = ({callback, options = {}, src}) => {
    return chokidar.watch(src, {...defaultChokidarOpts, ...options})
      .on('all', debounce(callback, 500));
  };

  watch({
    callback: ::gulp.series(babelTask, injectTask),
    src: 'critical.js'
  });

  chokidar.watch([
      'youtube-calendar-app.js',
      'youtube-calendar-app/**/*.js'
    ], defaultChokidarOpts)
    .on('all', ::gulp.parallel([babelTask]));

  chokidar.watch('sw/**/*.js', defaultChokidarOpts)
    .on('all', ::gulp.parallel([serviceWorkerBuildingTask]));

  chokidar.watch(config.srcFilesToCopy, defaultChokidarOpts)
    .on('all', ::gulp.series(copySrcStuffTask, injectTask));

  // force reload
  chokidar.watch('**/*.scss',  defaultChokidarOpts)
    .on('all', ::gulp.series(scssTask, ::browser.reload));

  // reload on output change
  chokidar.watch('**/*',  { ...defaultChokidarOpts, cwd: config.outFolder })
    .on('all', debounce(::gulp.parallel(::browser.reload), 500));
});

gulp.task('default', gulp.series(
  delOutputFolderTask,
  gulp.parallel(
    babelTask,
    copyNodeStuffTask,
    copySrcStuffTask,
    serverTask,
    serviceWorkerBuildingTask,
    scssTask
  ),
  injectTask,
  'watch'
));


