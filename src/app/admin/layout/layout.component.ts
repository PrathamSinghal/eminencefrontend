import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent implements OnInit {
  showPortalLayout: boolean = false;

  constructor(private _router: Router) {
    console.log(this._router.url)
    this._router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(() => {
      this.updateLayoutVisibility();
    });
  }

  ngOnInit(): void {
    this.updateLayoutVisibility();
  }

  updateLayoutVisibility(): void {
    console.log(this._router.url);
    if (this._router.url.includes('signin') || this._router.url.includes('signup') ) {
      this.showPortalLayout = false;
    }
    else {
      this.showPortalLayout = true;
    }
  }

}
