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

  public colorArray = [new Color("#fffdd2", 1), new Color("#e5e1b2", 2), new Color("#e5e1b2", 3), new Color("#66836f", 4), new Color("#281d19", 5)];

  constructor(){
    window.onbeforeunload = function() {window.scrollTo(0,0);}
    setTimeout(() => 
      {
          this.isOpen = false;
      },
      1000);
  }

}
