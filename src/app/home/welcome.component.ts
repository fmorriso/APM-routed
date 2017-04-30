import {Component, OnInit, VERSION} from '@angular/core';

@Component({
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  public pageTitle: string = 'Welcome';
  angularVersion: string;

  ngOnInit() {
    this.angularVersion = VERSION.full;
  }
}
