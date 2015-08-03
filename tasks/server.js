//

import browserSync from 'browser-sync';
import path from 'path';

export const server = browserSync.create('localhost');

export default function ({outFolder}) {
  function serverInitTask(cb) {
    server.init({
      logLevel: 'info',
      server: {
        baseDir: ['.', outFolder]
      },
      open: false,
      ghostMode: false,
      https: true,
      ui: false
    }, cb);
  }

  serverInitTask.description = 'The server task';

  return serverInitTask;
};

export function reload(){
  return server.reload();
}
