import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute }               from '@angular/router';
import { NgForm }                       from '@angular/forms';

import { IProduct } from './product';

@Component({
    templateUrl: './product-edit-info.component.html'
})
export class ProductEditInfoComponent implements OnInit {
    @ViewChild(NgForm) productForm: NgForm;

    errorMessage: string;
    product: IProduct;

    constructor(private route: ActivatedRoute) { }

    ngOnInit(): void {
      this.product = { id: 1, productName: 'test', productCode: 'test', category: 'test', releaseDate: '2017-01-31', price: 0, description: 'test', starRating: 1, imageUrl: '' };
    }
}
