import {Component, OnInit}      from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {MessageService}         from '../messages/message.service';

import {IProduct}               from './product';
// NOTE: although the ProductService is not needed to Get a product by its id,
// it is still needed for the other CRUD operations.
import {ProductService}         from './product.service';

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
              private router: Router) {
  }

  ngOnInit(): void {
    // get the product from the already resolved (by ProductResolver service)
    // data via its unique key
    this.route.data.subscribe(data => {
      // register our subscription "listener", which expects a product
      this.onProductRetrieved(<IProduct>data['product']);
    });
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
