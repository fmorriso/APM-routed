import { Injectable } from '@angular/core';
import {
  Resolve, ActivatedRouteSnapshot,
  RouterStateSnapshot, Router
} from '@angular/router';


import {ProductService} from './product.service';
import {Observable}     from 'rxjs/Observable';
import {IProduct}       from './product';

@Injectable()
export class ProductResolver implements Resolve<IProduct> {

  constructor(private productService: ProductService,
              private router: Router) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IProduct> {
    const id: number = Number(route.paramMap.get('id')); // old: +route.params['id']
    //const possibleId: string = route.paramMap.get('id');
    if (isNaN(id)) {
      console.log(`Product id was not a number: ${id}`);
      this.router.navigate(['/products']);
      return Observable.of(null);
    }
    return null;
  }
}
