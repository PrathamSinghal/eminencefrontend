import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-comp-header',
  templateUrl: './comp-header.component.html',
  styleUrl: './comp-header.component.scss'
})
export class CompHeaderComponent {

  @Input() title:string =''

}
