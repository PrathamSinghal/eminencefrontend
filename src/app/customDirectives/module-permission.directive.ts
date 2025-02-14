import { Directive, Input, TemplateRef, ViewContainerRef, OnDestroy, SimpleChanges, OnChanges } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[appModulePermission]'
})
export class ModulePermissionDirective implements OnChanges, OnDestroy {

  @Input('appModulePermission') public appModulePermission: string = '';
  @Input('appModulePermissionValue') public appModulePermissionValue: string = '';

  private subscription: Subscription = new Subscription();
  private isViewCreated = false;

  constructor(
    private loginService: LoginService,
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['appModulePermission'] || changes['appModulePermissionValue']) {
      this.updateView();
    }
  }

  private updateView() {
    this.subscription.unsubscribe();
    this.subscription = this.loginService.modulePermission(this.appModulePermission, this.appModulePermissionValue)
      .subscribe(status => {
        if (status) {
          if (!this.isViewCreated) {
            this.viewContainer.createEmbeddedView(this.templateRef);
            this.isViewCreated = true;
          }
        } else {
          this.viewContainer.clear();
          this.isViewCreated = false;
        }
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
