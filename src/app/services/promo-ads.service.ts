import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environment/environment';
import { promoAd } from '../models/promoAd';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PromoAdsService {

  constructor(private HttpClient: HttpClient) { }

  getPromoAds(): Observable<promoAd> {

    return new Observable<promoAd>((observer) => {

      this.HttpClient.get<promoAd[]>(environment.promoAdsUrl).subscribe({
        next: (adsArray) => {

          let counter = 0

          // Handle empty array case
          if (adsArray.length == 0) {
            observer.complete();
            return;
          }

          // Emit the first ad immediately
          observer.next(adsArray[counter]);
          counter++;


          let timer = setInterval(() => {
            if (counter < adsArray.length) {
              observer.next(adsArray[counter])
              counter++
            }
            else {
              // counter=0
              clearInterval(timer)
              observer.complete()
            }
          }, 3000);

          return {
            unsubscribe() { clearInterval(timer) }
          }
        }
      })
    })
  }
}
