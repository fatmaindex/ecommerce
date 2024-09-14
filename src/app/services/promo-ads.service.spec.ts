import { TestBed } from '@angular/core/testing';

import { PromoAdsService } from './promo-ads.service';

describe('PromoAdsService', () => {
  let service: PromoAdsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PromoAdsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
