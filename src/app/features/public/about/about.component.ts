import { Component } from '@angular/core';
import { NewsLettersComponent } from '../../../shared/components/news-letters/news-letters.component';
import { FeaturesComponent } from '../../../shared/components/features/features.component';

@Component({
  selector: 'app-about',
  standalone:true,
  imports:[NewsLettersComponent,FeaturesComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {

}
