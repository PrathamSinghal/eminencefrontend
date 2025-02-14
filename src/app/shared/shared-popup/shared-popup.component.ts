import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-shared-popup',
  templateUrl: './shared-popup.component.html',
  styleUrl: './shared-popup.component.scss'
})
export class SharedPopupComponent {
@Output() status: any = new EventEmitter()
@Input() title:string =''
@Input() details:string= ''
@Input() width:string = '380px'
}
