import { Component } from '@angular/core';
import { NewsLettersComponent } from '../../../shared/components/news-letters/news-letters.component';

@Component({
  selector: 'app-contact',
  standalone:true,
  imports:[NewsLettersComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {

}
