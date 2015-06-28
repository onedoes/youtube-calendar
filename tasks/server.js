//

import browserSync from 'browser-sync';
import path from 'path';

export default function ({outFolder}) {

  function serverTask(cb) {
    browserSync({
      server: {
        baseDir: ['.', outFolder]
      },
      files: path.resolve(outFolder, '**/*.+(js|css|html)'),
      logConnections: true,
      open: false,
      ghostMode: false,
      https: true,
      watchOptions: {
        debounceDelay: 1000
      }
    }, cb);
  }

  serverTask.description = 'The server task';

  return serverTask;
};
