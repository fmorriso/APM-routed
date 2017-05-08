import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute}               from '@angular/router';
import {NgForm}                       from '@angular/forms';

import {IProduct}                     from './product';

@Component({
  templateUrl: './product-edit-info.component.html',
  styleUrls:  ['./product-edit-info.component.css']
})
export class ProductEditInfoComponent implements OnInit {
  @ViewChild(NgForm) productForm: NgForm;

  errorMessage: string;
  product: IProduct;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    // use the Parent route resolver to get the product data
    this.route.parent.data.subscribe(data => {
      this.product = <IProduct>data['product'];

      if (this.productForm) {
        this.productForm.reset();
      }
    });
  }
}
