import { NgModule, OnInit } from '@angular/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { WidgetsComponent } from './widgets.component';
import { WidgetsRoutingModule } from './widgets-routing.module';
import { TeacherComponent } from './teacher.component';
import { CommonModule } from '@angular/common';
import { TutorialComponent } from './tutorial/tutorial.component';

@NgModule({
  imports: [
    WidgetsRoutingModule,
    ChartsModule,
    BsDropdownModule,
    CommonModule
  ],
  declarations: [ WidgetsComponent,TeacherComponent, TutorialComponent ]
})
export class WidgetsModule implements OnInit { 

  constructor(){

  }
  ngOnInit(): void {
    
  }
}
