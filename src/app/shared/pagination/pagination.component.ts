import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss',
})
export class PaginationComponent {
  @Input() totalItems!: number;
  @Input() itemsPerPage!: number;
  @Output() pageChange = new EventEmitter<number>();
  @Output() pageItem = new EventEmitter<number>();
  startIndex: number = 0;
  

  currentPage: number = 1;
  totalPages!: number;
  itemsArray = Array.from({ length: this.totalItems }, (_, index) => index + 1);


  ngOnChanges() {
    this.totalPagesChange()
  }

  prev() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.pageChange.emit(this.currentPage);
    }
  }

  next() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.pageChange.emit(this.currentPage);
    }
  }
  customPage(pagenumber: number) {
    this.currentPage = pagenumber;
    this.pageChange.emit(pagenumber);
  }

  onPageChange(page: number) {
    if (page !== this.currentPage) {
      this.currentPage = page;
      this.pageChange.emit(page);
    }
  }

  // Get an array of visible page numbers
  getVisiblePages(): number[] {
    const pages: number[] = [];
    // Include the current page and the pages surrounding it
    for (
      let i = Math.max(1, this.currentPage - 1);
      i <= Math.min(this.totalPages, this.currentPage + 6);
      i++
    ) {
      pages.push(i);
    }

    return pages;
  }

  changePageNumberCount(event:any){
    let target_value = event.target.value
    this.itemsPerPage = target_value
    this.currentPage = 1;
    this.pageChange.emit(1);
    this.pageItem.emit(target_value)
    this.totalPagesChange()
  }


  totalPagesChange(){
    this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
    if (this.currentPage > this.totalPages) {
      this.currentPage = this.totalPages;
    }
    this.itemsArray = Array.from(
      { length: this.totalPages },
      (_, index) => index + 1
    );
    // if(this.totalPages > 10){
    //   this.itemsArray = Array.from({ length: 10 }, (_, index) => index + 1);

    // }
    // else
    // {
    //   this.itemsArray = Array.from({ length: this.totalPages }, (_, index) => index + 1);
    // }
  }




}
