import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormArray,
  FormBuilder,
} from '@angular/forms';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrl: './search-input.component.scss'
})
export class SearchInputComponent {
  @ViewChild('search') search : any
  @Output() searchValue :any = new EventEmitter() 

  isSearchItem:boolean = false

  constructor(  private formBuilder: FormBuilder){}


  userSearch(){
    if(this.isSearchItem )
    {
      this.isSearchItem = true
      this.search.nativeElement.value= ""
      this.searchValue.emit(this.search.nativeElement.value)
    }
    else{
      this.isSearchItem = true
      this.searchValue.emit(this.search.nativeElement.value)
    }


  }
}
