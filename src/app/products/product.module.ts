import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {ProductListComponent} from './product-list.component';
import {ProductDetailComponent} from './product-detail.component';
import {ProductEditComponent} from './product-edit.component';
import {ProductEditInfoComponent} from './product-edit-info.component';
import {ProductEditTagsComponent} from './product-edit-tags.component';

import {ProductFilterPipe} from './product-filter.pipe';
import {ProductService} from './product.service';
import {ProductResolver} from './product-resolver.service';
import {ProductEditGuard} from './product-guard.service';

import {SharedModule} from '../shared/shared.module';

const routes: Routes = [
	{
		path: '',
		component: ProductListComponent
	},
	{
		path: ':id',
		component: ProductDetailComponent,
		resolve: {product: ProductResolver}
	},
	{
		path: ':id/edit',
		component: ProductEditComponent,
		canDeactivate: [ProductEditGuard],
		resolve: {product: ProductResolver},
		children: [
			{path: '', redirectTo: 'info', pathMatch: 'full'},
			{path: 'info', component: ProductEditInfoComponent},
			{path: 'tags', component: ProductEditTagsComponent}
		]
	}
];

// cannot use with forChild(): const rootConfig = {enableTracing: true};

// NOTE: the resolve: pre-fetches the data (a product in this example) before the screen displays
@NgModule({
	imports: [
		SharedModule,
		RouterModule.forChild(routes)
	],
	declarations: [
		ProductListComponent,
		ProductDetailComponent,
		ProductEditComponent,
		ProductEditInfoComponent,
		ProductEditTagsComponent,
		ProductFilterPipe
	],
	providers: [
		ProductService,
		ProductResolver,
		ProductEditGuard
	]
})
export class ProductModule {
}
