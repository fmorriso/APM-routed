import { NgModule }                 from '@angular/core';
import { RouterModule }             from '@angular/router';

import { ProductListComponent }     from './product-list.component';
import { ProductDetailComponent }   from './product-detail.component';
import { ProductEditComponent }     from './product-edit.component';

import { ProductFilterPipe }        from './product-filter.pipe';
import { ProductService }           from './product.service';

import { SharedModule }             from '../shared/shared.module';

import { ProductEditInfoComponent } from './product-edit-info.component';
import { ProductEditTagsComponent } from './product-edit-tags.component';
import { ProductResolver }          from './product-resolver.service';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      { path: 'products', component: ProductListComponent },
      { path: 'products/:id', component: ProductDetailComponent },
      { path: 'products/:id/edit', component: ProductEditComponent }
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
