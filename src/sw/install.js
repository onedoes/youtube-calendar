//

import {staticCacheName} from './constants';

export default function serviceWorkerInstallation(event) {
  return event.waitUntil(
    caches.open(staticCacheName).then(cache => {
      return cache.addAll([
        '/',
        '/shell.html',
        '/js/page.js',
        '/js/page-framework.js', // yeahhhh, we're caching waayyyyy more than we need, but keeps the request tests fair
        '/css/head-wiki.css', // don't need this when it's inlined, but helps when rendered with blocking CSS in settings
        '/css/wiki.css'
      ]);
    })
  );
}
