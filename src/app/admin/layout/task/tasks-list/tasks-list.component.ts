import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ArticleService } from '../../../../services/article.service';
import { Router } from '@angular/router';
import { SessionService } from '../../../../services/session.service';
import { FormBuilder } from '@angular/forms';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { TaskService } from '../../../../services/task.service';
import { SnackbarService } from '../../../../services/snackbar.service';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrl: './tasks-list.component.scss'
})
export class TasksListComponent implements OnInit {
  isArticleListLoading: boolean = false;
  pageNumber: number = 1;

  rolePath: string = '';
  // +++ Default column for register user +++

  //Table
  displayedColumns: string[] = [
    'select',
    'sno',
    'action',
    'tasktitle',
    'taskdetails',
    'taskstatus',
  ];
  dataSource: any = new MatTableDataSource();
  selection = new SelectionModel<any>(true, []);
  listoption: boolean = true;
  isLoading: boolean = false;
  pagedItems: any[] = [];
  totalItems!: number;
  itemsPerPage: number = 10;
  registeredAllData: Array<any> = [];
  //Table end

  isAdvanceFilter: boolean = false;
  search_item!: any;
  search_item_advanced: any;
  advacnedFiltercount: number = 0;

  dropdownSettings: IDropdownSettings = {
    singleSelection: false,
    idField: '_id',
    textField: 'title',
    selectAllText: 'Select All',
    unSelectAllText: 'Unselect All',
    itemsShowLimit: 3,
    allowSearchFilter: true
  };
  dropdownSettingsBudget: IDropdownSettings = {
    singleSelection: false,
    idField: '_id',
    textField: 'name',
    selectAllText: 'Select All',
    unSelectAllText: 'Unselect All',
    itemsShowLimit: 3,
    allowSearchFilter: true
  };
  dropdownSettingsAdvertiser: IDropdownSettings = {
    singleSelection: false,
    idField: '_id',
    textField: 'name',
    selectAllText: 'Select All',
    unSelectAllText: 'Unselect All',
    allowSearchFilter: true,
    enableCheckAll: false,
    closeDropDownOnSelection: true,
    itemsShowLimit: 1,
  };

  advertiserList: any = [];
  budgetList: Array<any> = [ //1-> 100k-200k, 2-> 200k-300k, 3-> 300k-400k, 4-> 400k-500k
    {
      _id: '1',
      name: '100k - 200k'
    },
    {
      _id: '2',
      name: '200k - 300k'
    },
    {
      _id: '3',
      name: '300k - 400k'
    },
    {
      _id: '4',
      name: '400k - 500k'
    },
  ];
  mediaList: Array<any> = [
    {
      _id: 'pending',
      name: 'Pending'
    },
    {
      _id: 'completed',
      name: 'Completed'
    }
  ];

  debounceTimeout: any

  // ========= Popup =======
  deletePopupDetails: any = "Are you sure you want to delete Advertisements? Deleting them will permanently remove all their data."
  deletePopupTitle: any = "Delete Advertisements"
  deletePopupFlag: boolean = false;


  constructor(private _articleService: ArticleService, private _router: Router,
    private _sessionService: SessionService, private formBuilder: FormBuilder,
    private _taskService: TaskService, private SnackbarService: SnackbarService) {
    this.rolePath = this._sessionService?.getRolePath;
    this.formInitializationSearchAdvance()
  }

  ngOnInit(): void {
    this.getAllTasks();
    // this.getAllAdvertiser();

    // this.getAllDepartmentList()
    // this.getAllCategory()
  }
  moveTo(path: any) {
    this._router.navigate([`/${this.rolePath}/${path}`]);
  }
  moveToWithId(data: any = { id: '', url: '' }) {
    this._router.navigate([`/${this.rolePath}/${data?.url}`, data?.id]);
  }

  moveToWithTwoId(data: any = { deptId: '', teamId: '', url: '' }) {
    this._router.navigate([`/${this.rolePath}/${data?.url}`, data?.deptId, data?.teamId])
  }
  getIdsAsString(arr: Array<any>) {
    return arr.map((item: any) => item._id.toString());
  }

  getAllTasks() {
    this.isArticleListLoading = true;
    const startDate = new Date(this.getAdvanceFormValue('startDate'))
    const endtDate = new Date(this.getAdvanceFormValue('endDate'))
    const payload = {
      queryParam: {
        page: this.pageNumber,
        search: !!this.search_item.get('search').value ? this.search_item.get('search').value?.trim() : '',
        limit: this.itemsPerPage,
        // page: this.pageNumber,
        // search: '',
        // limit: this.itemsPerPage,

      },
      body: {
        status: !!this.getAdvanceFormValue('status') ? this.getIdsAsString(this.getAdvanceFormValue('status')) : [],
      }
    }
    this._taskService.getAllTasks(payload).subscribe({
      next: (res: any) => {
        this.isArticleListLoading = false;
        if (res?.status == 200) {
          this.dataSource = new MatTableDataSource(res?.data?.docs);
          this.totalItems = res?.data?.totalDocs
        }

      },
      error: (err: any) => {
        this.isArticleListLoading = false;
      }
    })

  }

  editAction(event: any) {
    console.log(event);
  }
  onRowClicked(row: any) {
    console.log('Row clicked:', row);
  }

  getSerachValue(event: any) {
    console.log(event);
  }

  //Table click
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource?.data?.length;
    return numSelected === numRows;
  }

  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      this.listoption = true;
      return;
    }
    this.selection.select(...this.dataSource.data);
    this.listoption = false;
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row: any): any {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }

    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1
      }`;
  }

  checkUncheck() {
    if (this.selection.selected.length > 0) {
      this.listoption = false;
    } else {
      this.listoption = true;
    }
  }

  clearResonse() {
    this.selection.clear();
    this.listoption = !this.listoption;
  }

  deleteSelected() {
    let selectedItems = structuredClone(this.selection.selected);
    let payloadsIems: any = [];
    selectedItems.forEach((res: any) => {
      payloadsIems.push(res._id);
    });
    let payloads = { ids: payloadsIems };
    this._taskService?.deleteAdvertisement(payloads).subscribe({
      next: (response: any) => {
        this.getAllTasks();
        this.clearResonse();
      },
      error: (err) => {

      },
    });
  }

  changeItemPerPage(page: number) {
    this.itemsPerPage = page;
    this.getAllTasks()
  }
  onPageChange(page: number) {
    this.pageNumber = page
    this.getAllTasks()
  }
  //Table end

  advancedFilter() {
    let count = 0;
    for (const key in this.search_item_advanced.value) {
      if (this.search_item_advanced.value[key]?.length != 0) {
        count++;
      }
    }
    this.advacnedFiltercount = count;
    this.isAdvanceFilter = false;
    this.getAllTasks();
  }

  formInitializationSearchAdvance() {
    this.search_item = this.formBuilder.group({
      search: [''],
    });
    this.search_item_advanced = this.formBuilder.group({
      status: [[]],
      startDate: [''],
      endDate: [''],
      mediaType: [[]],
      advertiser: [[]],
      budget: [[]]
    });
  }

  resetFilter() {
    this.advacnedFiltercount = 0;
    this.isAdvanceFilter = false;
    // this.reloadData();
    this.search_item_advanced.reset();
    this.getAllTasks();
  }

  advancedFilterShow() {
    this.isAdvanceFilter = true;
  }

  userSearch(event: KeyboardEvent) {
    const ignoredKeys = ['Space', ' ', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Tab', 'Escape', 'Enter', 'Shift', 'Control', 'Alt', 'Meta'];
    if (ignoredKeys.includes(event.key)) {
      return;
    }

    clearTimeout(this.debounceTimeout);

    this.debounceTimeout = setTimeout(() => {
      const searchValue = this.search_item.get('search').value?.trim();
      if (searchValue && searchValue.length > 2) {
        this.getAllTasks();
        return;
      }
      if (searchValue?.length === 0) {
        // this.isSearchItem = false;
        this.search_item.reset();
        this.getAllTasks();
      }
    }, 500);
  }
  getAdvanceFormValue(field: string) {
    return this.search_item_advanced.get(field).value;
  }

  advancedFilterSearch() {
    this.getAllTasks();
  }

  changeArticleType(value: any) {
    this.search_item_advanced.patchValue({
      articleType: value
    })
    this.getAllTasks();

  }

  getAllAdvertiser() {
    this._taskService.getAllAdvertiser().subscribe({
      next: (res: any) => {
        this.advertiserList = res?.data
      }
    })
  }

  statusUpdate(id: any, value: any) {
    const payload = {
      "status": value, // 0-> unblock, 1-> block
      "_id": id
    };
    this._taskService.blockUnblockAdvertisement(payload).subscribe({
      next: (response: any) => {
        // Category/ Advertisement/ Advertiser Blocked/Unblocked successfully
        payload.status == 1 ? this.SnackbarService.getMessage('Advertisement Blocked successfully') : this.SnackbarService.getMessage('Advertisement Unblocked successfully');
        this.getAllTasks();
      },
      error: (err) => {
        // this.SnackbarService.getMessage('Something went wrong!!');
      },
    });
  }

  openDeletePopup() {
    this.deletePopupFlag = true;

  }
  closeDeletePopup() {
    this.deletePopupFlag = false;
  }


  deletePopupStatus(event: any) {
    if (event) {
      this.deleteSelected();
    }
    this.closeDeletePopup();
  }

}


