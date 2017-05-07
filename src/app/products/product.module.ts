import { NgModule }                 from '@angular/core';
import { RouterModule }             from '@angular/router';

import { ProductListComponent }     from './product-list.component';
import { ProductDetailComponent }   from './product-detail.component';
import { ProductEditComponent }     from './product-edit.component';

import { ProductFilterPipe }        from './product-filter.pipe';
import { ProductService }           from './product.service';
import { ProductResolver }          from './product-resolver.service';

import { SharedModule }             from '../shared/shared.module';

import { ProductEditInfoComponent } from './product-edit-info.component';
import { ProductEditTagsComponent } from './product-edit-tags.component';

// NOTE: the resolve: pre-fetches the data (a product in this example) before the screen displays
@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      { path: 'products', component: ProductListComponent },
      {
        path: 'products/:id',
        component: ProductDetailComponent,
        resolve: { product: ProductResolver }
      },
      {
        path: 'products/:id/edit',
        component: ProductEditComponent,
        resolve: { product: ProductResolver }
      }
    ])
  ],
  declarations: [
    ProductListComponent,
    ProductDetailComponent,
    ProductEditComponent,
    ProductFilterPipe,
    ProductEditInfoComponent,
    ProductEditTagsComponent
  ],
  providers: [
    ProductService,
    ProductResolver
  ]
})
export class ProductModule {}
