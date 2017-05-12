import { NgModule }        from '@angular/core';
import { CommonModule }    from '@angular/common';
import { FormsModule }     from '@angular/forms';

import { StarComponent }   from './star.component';
import { FooterComponent } from './footer.component';


@NgModule({
  imports: [ CommonModule],
  exports : [
    CommonModule,
    FormsModule,
    StarComponent,
    FooterComponent

  ],
  declarations: [
    StarComponent,
    FooterComponent
    ],
})
export class SharedModule { }
