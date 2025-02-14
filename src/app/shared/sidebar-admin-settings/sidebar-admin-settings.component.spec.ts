import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarAdminSettingsComponent } from './sidebar-admin-settings.component';

describe('SidebarAdminSettingsComponent', () => {
  let component: SidebarAdminSettingsComponent;
  let fixture: ComponentFixture<SidebarAdminSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SidebarAdminSettingsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidebarAdminSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
