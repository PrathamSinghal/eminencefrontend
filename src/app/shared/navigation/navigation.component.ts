import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
})
export class NavigationComponent implements OnInit {
  rolePath: string = ''
  sidebarCloseFlag: Boolean = false


  constructor(private _router: Router, private _loginService: LoginService, private location: Location) {
    this._loginService.rolePath$.subscribe(path => {
      this.rolePath = path;
    });

  }
  ngOnInit(): void {

  }

  moveBack() {
    this.location.back()

  }


  moveTo(path: any) {
    console.log(`/${this.rolePath}/${path?.path}`)
    this._router.navigate([`/${this.rolePath}/${path}`]);
  }
  moveToWithId(data: any = { id: '', url: '' }) {
    this._router.navigate([`/${this.rolePath}/${data?.url}`, data?.id]);
  }

  moveToWithTwoId(data: any = { deptId: '', teamId: '', url: '' }) {
    this._router.navigate([`/${this.rolePath}/${data?.url}`, data?.deptId, data?.teamId])
  }
  sidebarCloseEvent(sidebarClose: Boolean) {
    this.sidebarCloseFlag = sidebarClose
  }
}
