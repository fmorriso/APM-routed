import {Component, OnInit} from '@angular/core';
import {ActivatedRoute}    from '@angular/router';

import {IProduct}          from './product';


@Component({
  templateUrl: './product-detail.component.html'
})
export class ProductDetailComponent implements OnInit {

  pageTitle = 'Product Detail';
  product: IProduct;
  errorMessage: string;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    // get the product from the already resolved (by ProductResolver service)
    // data via its unique key
    this.product = <IProduct>this.route.snapshot.data['product'];
  }

}
