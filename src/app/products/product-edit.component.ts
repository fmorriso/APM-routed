import { Component, OnInit }      from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MessageService }         from '../messages/message.service';

import { IProduct }               from './product';
import { ProductService }         from './product.service';


@Component({
    templateUrl: './product-edit.component.html',
    styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {

    pageTitle: string = 'Product Edit';
    errorMessage: string;
    product: IProduct;

    constructor(private productService: ProductService,
                private messageService: MessageService,
                private route: ActivatedRoute,
                private router: Router) { }

    ngOnInit(): void {
      // subscribe to the observable of changes in route parameters
      this.route.paramMap.subscribe(
        params => {
          console.log(`product-edit - ngOnInit - paramMap - params=${JSON.stringify(params)}`);
          //const id: number= Number(params['id']);
          const id: number = Number(params.get('id'));
          this.getProduct(id);
        }
      );
    }

    getProduct(id: number): void {
        // console.log('product-edit - getProduct - id:' + id);
        this.productService.getProduct(id)
            .subscribe(
                (product: IProduct) => this.onProductRetrieved(product),
                (error: any) => this.errorMessage = <any>error
            );
    }

    onProductRetrieved(product: IProduct): void {
        this.product = product;
        //console.log('product-edit - onProductRetrieved - product:' + JSON.stringify(product));
        if (this.product.id === 0) {
            this.pageTitle = 'Add Product';
        } else {
            this.pageTitle = `Edit Product: ${this.product.productName}`;
        }
    }

    deleteProduct(): void {
        if (this.product.id === 0) {
            // Don't delete, it was never saved.
            this.onSaveComplete();
       } else {
            if (confirm(`Really delete the product: ${this.product.productName}?`)) {
                this.productService.deleteProduct(this.product.id)
                    .subscribe(
                        () => this.onSaveComplete(`${this.product.productName} was deleted`),
                        (error: any) => this.errorMessage = <any>error
                    );
            }
        }
    }

    saveProduct(): void {
        if (true === true) {
            this.productService.saveProduct(this.product)
                .subscribe(
                    () => this.onSaveComplete(`${this.product.productName} was saved`),
                    (error: any) => this.errorMessage = <any>error
                );
        } else {
            this.errorMessage = 'Please correct the validation errors.';
        }
    }

    onSaveComplete(message?: string): void {
        if (message) {
            this.messageService.addMessage(message);
        }

        // Navigate back to the product list
        this.router.navigate(['/products']);
    }
}
