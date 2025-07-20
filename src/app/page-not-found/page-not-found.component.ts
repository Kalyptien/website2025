import { Component } from '@angular/core';
import { BalatroComponent } from "../not-found-component/balatro/balatro.component";

@Component({
  selector: 'app-page-not-found',
  imports: [BalatroComponent],
  templateUrl: './page-not-found.component.html',
  styleUrl: './page-not-found.component.scss'
})
export class PageNotFoundComponent {

}
