import { Component } from '@angular/core';
import { BalatroComponent } from "../not-found-component/balatro/balatro.component";
import { GalaxyComponent } from "../not-found-component/galaxy/galaxy.component";

@Component({
  selector: 'app-page-not-found',
  imports: [BalatroComponent, GalaxyComponent],
  templateUrl: './page-not-found.component.html',
  styleUrl: './page-not-found.component.scss'
})
export class PageNotFoundComponent {

}
