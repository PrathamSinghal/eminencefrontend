import { Component, Input } from '@angular/core';
import { LoaderServiceService } from '../../services/loader-service.service';


@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrl: './spinner.component.scss'
})
export class SpinnerComponent {
  // constructor(public loader: LoaderServiceService){}
  @Input() type: number = 0
  constructor() { }

}
