import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {MessageService} from '../messages/message.service';

import {IProduct} from './product';
// NOTE: although the ProductService is not needed to Get a product by its id,
// it is still needed for the other CRUD operations.
import {ProductService} from './product.service';

@Component({
	templateUrl: './product-edit.component.html',
	styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit {

	pageTitle = 'Product Edit';
	errorMessage: string;

	private dataIsValid: { [key: string]: boolean } = {};

	private currentProduct: IProduct;
	private originalProduct: IProduct;

	constructor(private productService: ProductService,
	            public messageService: MessageService,
	            private route: ActivatedRoute,
	            private router: Router) {
	}

	get product(): IProduct {
		return this.currentProduct;
	}

	set product(value: IProduct) {
		this.currentProduct = value;
		// Clone the object to retain a copy
		this.originalProduct = Object.assign({}, value);
	}

	get isDirty(): boolean {
		return JSON.stringify(this.originalProduct) !== JSON.stringify(this.currentProduct);
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

	// validate the specified tab via the key passed in
	isValid(tabKey?: string): boolean {

		this.validate();

		// if checking a specific tab
		if (tabKey) {
			return this.dataIsValid[tabKey];
		}

		// Checking all tabs, so
		// the final validation result is a logical AND of each data validation key/value pair
		return (this.dataIsValid &&
			Object.keys(this.dataIsValid).every(key => this.dataIsValid[key] === true));
	}

	reset(): void {
		this.dataIsValid = null;
		this.currentProduct = null;
		this.originalProduct = null;
	}

	saveProduct(): void {
		// pass a null tabKey to force validation of the entire product, not just the data on one tab
		if (this.isValid(null)) {
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
		this.reset();

		// Navigate back to the product list
		this.router.navigate(['/products']);
	}

	// validate the product, using the product instance, not the form elements.
	// In this situation, we have two "keys", one for the product "info" which handles
	// validation of the portion of the current product shown in product-edit-info.component.html
	// and a second key of "tags" that handles validation of the portion of the product shown
	// on product-edit-tags.component.html
	validate(): void {
		// Clear the validation object
		this.dataIsValid = {};

		// 'info' tab
		if (this.product.productName &&
			this.product.productName.length >= 3 &&
			this.product.productCode) {
			this.dataIsValid['info'] = true;
		} else {
			this.dataIsValid['info'] = false;
		}

		// 'tags' tab
		if (this.product.category &&
			this.product.category.length >= 3) {
			this.dataIsValid['tags'] = true;
		} else {
			this.dataIsValid['tags'] = false;
		}
	}
}
