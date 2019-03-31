import { Component, OnInit } from '@angular/core';
import { getStyle } from '@coreui/coreui/dist/js/coreui-utilities';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { DashboardService } from '../../shared/dashboard.service';

  @Component({
    templateUrl: 'teacher.component.html',
  })
  export class TeacherComponent implements OnInit {
     teachers:any=[]; 
    constructor(private dash:DashboardService){

    }
    ngOnInit() {
        //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
        //Add 'implements OnInit' to the class.
        this.dash.getTeacherTPO().subscribe(data=>{
            this.teachers=data.teacher_list;
        });
    }
  }