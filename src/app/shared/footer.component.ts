import { Component, OnInit, VERSION } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  private version: string;

  constructor() { }

  ngOnInit() {
    this.version = VERSION.full;
  }

  get angularVersion(): string {
    return this.version;
  }

}
