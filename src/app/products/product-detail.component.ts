import { Component, OnInit } from '@angular/core';
import { ActivatedRoute }    from '@angular/router';

import { IProduct }          from './product';
import { ProductService }    from './product.service';


@Component({
    templateUrl: './product-detail.component.html'
})
export class ProductDetailComponent implements OnInit {

    pageTitle: string = 'Product Detail';
    product: IProduct;
    errorMessage: string;

    constructor(private productService: ProductService,
                private route: ActivatedRoute) { }

    ngOnInit(): void {
      const id: number = <number>this.route.snapshot.params['id'];
      this.getProduct(id);
    }

    getProduct(id: number) {
        this.productService.getProduct(id).subscribe(
            product => this.product = product,
            error => this.errorMessage = <any>error);
    }
}
