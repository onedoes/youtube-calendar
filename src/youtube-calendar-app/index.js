//

import {bootstrap} from 'angular2';
import {Component, View} from 'angular2';
import {NgClass} from 'angular2';

import ytcHTMLTemplate from './index.html!text';
import ytcStyle from './index.css!';

@Component({
  selector: 'youtube-calendar-app'
})
@View({
  template: ytcHTMLTemplate,
  directives: [
    NgClass
  ]
})
class YouTubeCalendarApp {
  constructor() {
    this.style = ytcStyle.default;
  }
}

bootstrap(YouTubeCalendarApp);
