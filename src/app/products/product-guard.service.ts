import { Injectable }           from '@angular/core';
import { CanDeactivate }        from '@angular/router';

import { ProductEditComponent } from './product-edit.component';
@Injectable()
export  class ProductEditGuard implements CanDeactivate<ProductEditComponent> {

    // if there are unsaved changes to the product being edited, ask user what to do.
    canDeactivate(component: ProductEditComponent): boolean {
        if (component.isDirty) {
            const productName: string = component.product.productName || 'New Product';
            return confirm(`Navigate away and lose all changes to ${productName}?`);
        }
        return true;
    }
}
