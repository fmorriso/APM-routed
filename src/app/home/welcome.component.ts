import {Component, OnInit, VERSION} from '@angular/core';

@Component({
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  public pageTitle = 'Welcome';
  angularVersion: string;

  ngOnInit() {
    this.angularVersion = VERSION.full;
  }
}
