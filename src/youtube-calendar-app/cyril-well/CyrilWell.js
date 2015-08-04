//

import {bootstrap} from 'angular2';
import {Component, View} from 'angular2';
import {CSSClass} from 'angular2';

import cyrilWellHTMLTemplate from './index.html!text';
import cyrilWellStyle from './index.css!';

@Component({
  selector: 'cyril-well'
})
@View({
  template: cyrilWellHTMLTemplate,
  directives: [CSSClass]
})
export default class CyrilWell{
  constructor(){
    this.style = cyrilWellStyle.default;
  }
}

