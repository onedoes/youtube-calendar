//

import {bootstrap} from 'angular2';
import {Component, View} from 'angular2';
import {CSSClass} from 'angular2';

import douglasWellHTMLTemplate from './index.html!text';
import douglasWellStyle from './index.css!';

@Component({
  selector: 'douglas-well'
})
@View({
  template: douglasWellHTMLTemplate,
  directives: [CSSClass]
})
export default class DouglasWell{
  constructor(){
    this.style = douglasWellStyle.default;
  }
}

