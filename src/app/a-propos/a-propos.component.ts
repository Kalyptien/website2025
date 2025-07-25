import { Component } from '@angular/core';
import { Color } from '../types/color';
import { LoadingComponent } from '../loading/loading.component';

@Component({
  selector: 'app-a-propos',
  imports: [LoadingComponent],
  templateUrl: './a-propos.component.html',
  styleUrl: './a-propos.component.scss'
})

export class AProposComponent {

  public isOpen = true;
  public age = 0;

  public colorArray = [new Color("#ddffff", 1), new Color("#bbe5ff", 2), new Color("#97adcd", 3), new Color("#8e839e", 4), new Color("#1e474b", 5)];

  constructor(){
    window.onbeforeunload = function() {window.scrollTo(0,0);}
    setTimeout(() => 
      {
          this.isOpen = false;
      },
      100);

      const date = new Date();
      this.age =  date.getFullYear() - 2001;
  }

}
