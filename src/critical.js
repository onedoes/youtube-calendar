//

(function ({
  Promise,
  System
}) {

  Promise.all([
    System.import('reflect-metadata'),
    System.import('zone.js')
  ])
  .then(::System.import('./youtube-calendar-app'));

}(window));
