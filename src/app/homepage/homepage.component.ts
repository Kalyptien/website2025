import { Component, ElementRef, ViewChild } from '@angular/core';
import { LoadingComponent } from '../loading/loading.component';
import { Color } from '../types/color';

@Component({
  selector: 'app-homepage',
  imports: [LoadingComponent],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})

export class HomepageComponent {

  public isOpen = true;

  public colorArray = [new Color("#fffdd7", 1), new Color("#e8e5bc", 2), new Color("#a8ae8a", 3), new Color("#718e7a", 4), new Color("#2e2119", 5)];

  constructor(){
    window.onbeforeunload = function() {window.scrollTo(0,0);}
    setTimeout(() => 
      {
          this.isOpen = false;
      },
      1000);
  }

}
