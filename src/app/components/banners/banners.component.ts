import { Component } from '@angular/core';
import { promoAd } from '../../models/promoAd';
import { PromoAdsService } from '../../services/promo-ads.service';

@Component({
  selector: 'app-banners',
  templateUrl: './banners.component.html',
  styleUrl: './banners.component.scss'
})
export class BannersComponent {
  adTitle!: string ;
  adImageUrl!: string ;

  constructor(private promoAdsService: PromoAdsService) {

    let adsSubscription = this.promoAdsService.getPromoAds().subscribe({
      next: (promoAd:promoAd) => {
        this.adTitle = promoAd.title
        this.adImageUrl = promoAd.image
      }
      , complete: () => {
        adsSubscription.unsubscribe()
      }  }

    )
  }
}
