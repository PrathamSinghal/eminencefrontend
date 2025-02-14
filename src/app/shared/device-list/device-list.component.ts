import { Component, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { UsermangementService } from '../../services/usermangement.service';
import { LoginService } from '../../services/login.service';
import { SnackbarService } from '../../services/snackbar.service';
import { Common } from '../../common/common';

@Component({
  selector: 'app-device-list',
  templateUrl: './device-list.component.html',
  styleUrl: './device-list.component.scss'
})
export class DeviceListComponent {
  displayedColumns: string[] = [];
  dataSource: any = new MatTableDataSource();
  @Input() id: string = '';

  tableItems: Array<any> = []
  pagedItems: any[] = [];
  totalItems!: number;
  itemsPerPage: number = 10;
  hideSomeValue: any = Common.hideSomeValue

  userInfo: any

  // ========= Popup =======
  deletePopupDetails: any = "Are you sure you want to Sign Out this device."
  deletePopupTitle: any = "Sign Out"
  deletePopupFlag: boolean = false;

  logoutId: any

  constructor(private usermangementService: UsermangementService, private loginService: LoginService, private snackbarService: SnackbarService) { }

  ngOnInit() {
    this.displayedColumns = [
      'sno',
      'deviceId',
      'deviceType',
      'deviceName',
      'firstSignin',
      'lastActive',
      'action'
    ];
  }

  ngOnChanges() {
    this.getDeviceList();
  }

  getDeviceList() {
    if (!!this.id) {
      this.usermangementService.getManageDeviceList(this.id).subscribe({
        next: (res: any) => {
          if (res.status == 200 && res.data.devicesData) {
            console.log(res.data.devicesData)
            this.userInfo = res?.data;
            this.setItems(res.data.devicesData)
          }
          else {
            this.resetValues()
          }
        },
        error: (err) => {
          console.log(err);
        },
      });
    }

  }

  setItems(responseData: Array<any>) {
    this.resetValues();
    responseData.forEach((element: any, index: number) => {
      // let updated_user = {
      //   sno,
      //   deviceId,
      //   deviceType,
      //   deviceName,
      //   firstSignin,
      //   lastActive,
      //   action
      // };
      this.tableItems.push(element);
    });
    this.totalItems = this.tableItems.length;
    this.updatePagedItems(1);
  }

  resetValues() {
    this.tableItems = [];
    this.totalItems = 0;
    this.dataSource = new MatTableDataSource([]);
  }
  updatePagedItems(page: number) {
    const startIndex = (page - 1) * this.itemsPerPage;
    const endIndex = startIndex + Number(this.itemsPerPage);
    this.pagedItems = this.tableItems.slice(startIndex, endIndex);
    this.dataSource = new MatTableDataSource(this.pagedItems);
  }
  onPageChange(page: number) {
    this.updatePagedItems(page);
  }
  changeItemPerPage(page: number) {
    this.itemsPerPage = page
    this.getDeviceList()
  }

  logoutById() {
    this.loginService.accountsLogoutById(this.logoutId).subscribe({
      next: (res: any) => {
        this.snackbarService?.getMessage(res?.message)
        this.getDeviceList();
      }
    })

  }

  openDeletePopup(deleteId: any) {
    this.logoutId = deleteId;
    this.deletePopupFlag = true;

  }
  closeDeletePopup() {
    this.deletePopupFlag = false;
  }


  deletePopupStatus(event: any) {
    if (event) {
      this.logoutById();
    }
    this.closeDeletePopup();
  }
}

