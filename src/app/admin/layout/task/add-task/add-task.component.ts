import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormArray,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { DepartmentService } from '../../../../services/department.service';
import { SnackbarService } from '../../../../services/snackbar.service';
import { LoginService } from '../../../../services/login.service';
import { SessionService } from '../../../../services/session.service';
import { SelectionModel } from '@angular/cdk/collections';
import { ArticleService } from '../../../../services/article.service';
import { CommonService } from '../../../../services/common.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { format } from 'date-fns';
import { TaskService } from '../../../../services/task.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.scss'
})
export class AddTaskComponent implements OnInit {
  isAdvAddLoading: boolean = false;
  isImageLoading: boolean = false;
  rolePath: string = '';
  selectedFile: File | null = null;
  advDetails: any

  taskId: any = '';
  advertisementForm!: FormGroup;
  displayedColumns: string[] = ['sno', 'language', 'categoryname', 'action'];
  modules!: FormArray;
  dataSource: any = new MatTableDataSource();
  userId: any;

  selection = new SelectionModel<any>(true, []);
  listoption: boolean = true;
  isLoading: boolean = false;
  pagedItems: any[] = [];
  totalItems!: number;
  itemsPerPage: number = 10;
  registeredAllData: Array<any> = [];

  pollType: Array<any> = [
    {
      id: '1',
      name: 'ABC'
    },
    {
      id: '2',
      name: 'EFG'
    }
  ];
  advertiserList: Array<any> = [];
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
  budgetList: Array<any> = [ //1-> 100k-200k, 2-> 200k-300k, 3-> 300k-400k, 4-> 400k-500k
    {
      id: '1',
      name: '100k - 200k'
    },
    {
      id: '2',
      name: '200k - 300k'
    },
    {
      id: '3',
      name: '300k - 400k'
    },
    {
      id: '4',
      name: '400k - 500k'
    },
  ];
  dropdownSettings: IDropdownSettings = {
    singleSelection: true,
    idField: 'id',
    textField: 'name',
    selectAllText: 'Select All',
    unSelectAllText: 'Unselect All',
    allowSearchFilter: true,
    enableCheckAll: false,
    closeDropDownOnSelection: true,
    itemsShowLimit: 1,
  };
  dropdownSettingsAdvertiser: IDropdownSettings = {
    singleSelection: true,
    idField: '_id',
    textField: 'name',
    selectAllText: 'Select All',
    unSelectAllText: 'Unselect All',
    allowSearchFilter: true,
    enableCheckAll: false,
    closeDropDownOnSelection: true,
    itemsShowLimit: 1,
  };

  editPopupFlag: boolean = false;
  popupRowId: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private departmentService: DepartmentService,
    private snackbarService: SnackbarService,
    private activatedRoute: ActivatedRoute,
    private _router: Router,
    private loginService: LoginService,
    private sessionService: SessionService,
    private _articleService: ArticleService,
    private _taskService: TaskService,
    private _commonService: CommonService,
  ) {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.taskId = params.get('id');
    });
    this.loginService.rolePath$.subscribe((path) => {
      this.rolePath = path;
    });
  }

  ngOnInit(): void {
    this.formInitialization();

    // this.getAllAdvertiser();
    if (this.taskId !== undefined && this.taskId !== null && this.taskId !== '') {
      this.getTaskById(this.taskId);
    }
  }


  formInitialization() {
    const startDate = new Date();
    const localStartDate = format(startDate, "yyyy-MM-dd'T'HH:mm");
    const urlPattern = new RegExp(
      '^(https?|ftp):\\/\\/((localhost|([a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,})|\\d{1,3}(\\.\\d{1,3}){3})(:[0-9]{1,5})?(\\/[^\\s]*)?$');
    this.advertisementForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(50)]],
      description: ['', [Validators.required, Validators.maxLength(200)]],
      status: [''],
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      if (file.size > 1048576) {
        alert('File size exceeds 1MB');
        input.value = '';
      } else {
        this.selectedFile = file;
        this.uploadImage(file)
        // this.advertisementForm.patchValue({
        //   upload: file,
        // });
        this.advertisementForm.get('upload')?.markAsTouched();
        this.advertisementForm.get('upload')?.markAsDirty();
        // console.log('Selected file:', this.selectedFile);
      }
    }
  }

  createMultiTitle(): FormControl {
    return this.fb.control('', Validators.required);
  }

  get multiTitle(): FormArray {
    return this.advertisementForm.get('multiTitle') as FormArray;
  }

  addMultiTitle(): void {
    this.multiTitle.push(this.createMultiTitle());
  }

  removeMultiTitle(index: number): void {
    this.multiTitle.removeAt(index);
  }

  moveTo(path: string) {
    this._router.navigate([`/${this.rolePath}/${path}`]);
  }
  moveToWithId(data: any = { id: '', url: '' }) {
    this._router.navigate([`/${this.rolePath}/${data?.url}`, data?.id]);
  }

  moveToWithTwoId(data: any = { taskId: '', teamId: '', url: '' }) {
    this._router.navigate([
      `/${this.rolePath}/${data?.url}`,
      data?.taskId,
      data?.teamId,
    ]);
  }

  onSubmit() {
    this.isAdvAddLoading = true;
    // console.log("Form Value :- ", this.advertisementForm.value);
    if (this.advertisementForm.invalid) {
      this.advertisementForm.markAllAsTouched();
      this.isAdvAddLoading = false;
      return;
    }
    let advPayload = this.advertisementForm.value;
    let payloads: any = {
      title: advPayload.title,
      description: advPayload.description,
      status: advPayload.status[0]?._id,
    };

    if (this.taskId !== undefined && this.taskId !== null && this.taskId !== '') {
      // ============= Update =============
      this._taskService.updateTask(payloads,this.taskId).subscribe({
        next: (res: any) => {
          this.isAdvAddLoading = false;
          if (res?.status == 200) {
            this.moveTo('task/tasks-list')
          }
        },
        error: (err) => {
          this.isAdvAddLoading = false;
          this.snackbarService.getMessage(err.error?.errors[0]?.msg);
        }
      })
    } else {
      // ============= Add =============

      this._taskService.createTask(payloads).subscribe({
        next: (res: any) => {
          this.isAdvAddLoading = false;
          if (res.status == 200) {
            this.snackbarService.getMessage(res?.message);
            this.advertisementForm.reset();
            this.moveTo('task/tasks-list')
          }
        },
        error: (err: any) => {
          this.isAdvAddLoading = false;
          if (err.error) {
            this.snackbarService.getMessage(err.error?.errors[0]?.msg);
          }
        },
      });

    }

  }
  submitEditPopup(data: any) {
    this.editPopupFlag = false;
    let updateCategoryPayload = {
      lang: data?.lang,
      title: this.advertisementForm?.value?.categoryName?.trim(),
      articleCategoryId: this.taskId,
    };
    this._articleService.updateCategory(updateCategoryPayload).subscribe({
      next: (res: any) => {
        if (res?.status == 200) {
          this.getTaskById(this.taskId);
          this.advertisementForm.reset();
        }
      },
    });
  }

  getTaskById(id: any) {
    const payload = {
      id: id,
    };
    this._taskService.getTaskById(payload).subscribe({
      next: (res: any) => {
        if (res?.status == 200) {
          this.advDetails = res?.data
          this.advertisementForm.patchValue({
            title: this.advDetails.title,
            description: this.advDetails.description,
          });
        }
      },
    });
  }
  setMultiTitle(multiTitles: string[]) {
    const control = <FormArray>this.advertisementForm.get('multiTitle');
    multiTitles.forEach((ele: any) => {
      control.push(this.fb.control(ele?.title));
    });
  }

  onRowClicked(row: any) { }

  onPageChange(page: number) { }

  onEdit(data: any) {
    this.popupRowId = data?._id;
    this.editPopupFlag = true;
    console.log(this.popupRowId);
  }
  openImage() {
    console.log(this.advertisementForm.get('upload')?.value);
  }
  removeImage() {
    this.advertisementForm.patchValue({
      upload: null, // Store the file object or file name
    });
  }

  uploadImage(file: File) {
    this.isImageLoading = true;
    const formData = new FormData();
    formData.append('file', file);
    this._commonService.uploadImage(formData).subscribe({
      next: (res: any) => {
        this.isImageLoading = false;
        if (res.status == 200) {
          this.advertisementForm.patchValue({
            upload: res?.data?.imageUrl,
          });
        }

      },
      error: (err: any) => {
        this.isImageLoading = false;
        console.log(err.error)
      }
    });
  }

  // getAllAdvertiser() {
  //   this._taskService.getAllAdvertiser().subscribe({
  //     next: (res: any) => {
  //       this.advertiserList = res?.data
  //       if (this.advertisementId !== undefined && this.advertisementId !== null && this.advertisementId !== '') {
  //         this.getTaskById(this.advertisementId);
  //       }
  //     }
  //   })
  // }
}
