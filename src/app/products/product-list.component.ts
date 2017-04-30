import { Component, OnInit } from '@angular/core';
import { ActivatedRoute }    from '@angular/router'

import { IProduct }          from './product';
import { ProductService }    from './product.service';


@Component({
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  pageTitle: string = 'Product List';
  imageWidth: number = 50;
  imageMargin: number = 2;
  showImage: boolean = false;
  listFilter: string;
  errorMessage: string;

  products: IProduct[];

  constructor(private productService: ProductService,
              private route: ActivatedRoute) { }

  toggleImage(): void {
    this.showImage = !this.showImage;
  }

  ngOnInit(): void {
    // read any optional query parameters
    this.listFilter = this.route.snapshot.queryParamMap.get('filterBy') || '';
    // Warning:  Boolean( this.route.snapshot.queryParamMap.get('showImage') ) is always true, even when it contains the string 'false' !
    this.showImage =  this.route.snapshot.queryParamMap.get('showImage') === 'true';

    this.productService.getProducts()
      .subscribe(products => this.products = products,
        error => this.errorMessage = <any>error);
  }
}
