import { Component, Input } from '@angular/core';
import { Color } from '../types/color';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.scss'
})
export class LoadingComponent {
  @Input() colorArray: Array<Color> = new Array<Color>;
  @Input() isOpen: boolean = true;
}
