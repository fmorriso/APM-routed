import { TestBed, inject } from '@angular/core/testing';

import { ProductResolver } from './product-resolver.service';

describe('ProductResolver', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductResolver]
    });
  });

  it('should ...', inject([ProductResolver], (service: ProductResolver) => {
    expect(service).toBeTruthy();
  }));
});
