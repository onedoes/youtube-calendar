//

import gulp from 'gulp';
import inject from 'gulp-inject';

export default function (config) {

  function injectTask() {

    return gulp.src(config.src,
      { cwd: config.cwd, since: gulp.lastRun(injectTask.name) }
    )
      .pipe(inject(
        gulp.src(config.asyncInjection, {
          cwd: config.dest,
          read: config.isInlining
        }),
        {
          addRootSlash: false,
          transform: config.isInlining && inlineAsyncFiles
        }
      ))
      .pipe(inject(gulp.src(config.syncInjection, {
        cwd: config.dest,
        read: config.isInProductionMode
      }), {
        addRootSlash: false,
        name: 'sync',
        transform: config.isInProductionMode && inlineSyncFiles
      }))
      .pipe(gulp.dest(config.dest));
  }

  injectTask.description = 'Inject content into a file';

  return injectTask;
}


function inlineSyncFiles(filePath, file) {
  var content = file.contents.toString('utf8');

  if (filePath.slice(-3) === '.js') {
    // inline the js script in a script tag
    content = '<script>\n' + content.replace('</script>', '<\\/script>') + '\n</script>';
  }
  else if (filePath.slice(-4) === '.css') {
    // inline the js script in a style tag
    content = '<style>\n' + content + '\n</style>'
  }
  return content;
}

function inlineAsyncFiles(filePath, file) {
  var content = file.contents.toString('utf8');

  if (filePath.slice(-3) === '.js') {
    // inline the js script in a script tag
    content = '<script async defer>\n' + content.replace('</script>', '<\\/script>') + '\n</script>';
  }
  else if (filePath.slice(-4) === '.css') {
    // inline the js script in a style tag
    content = '<style>\n' + content + '\n</style>'
  }
  return content;
}
