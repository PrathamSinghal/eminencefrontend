import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-table-items',
  templateUrl: './table-items.component.html',
  styleUrl: './table-items.component.scss',
})
export class TableItemsComponent {
  @Input() data :Array<any>= [];
  columnNames :any;
  dataSource:Array<any> =[]
  @Output() actionType:any = new EventEmitter()




  ngOnChanges(){
    this.dataSource = this.data

    this.columnNames = Object.keys(this.data[0]);

  }

  capitalize(s: string): string {
    return s.charAt(0).toUpperCase() + s.slice(1);
  }

  editAction(data:object, type:string){
    this.actionType.emit({data:data, type:type})
  }
}
