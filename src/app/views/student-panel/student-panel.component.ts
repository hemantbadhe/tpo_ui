import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ChatDialogComponent } from '../chat-dialog/chat-dialog.component';
import { NgbdModalBasic } from './modal-basic';
import { DashboardService } from '../../shared/dashboard.service';

export interface DialogData {
  animal: string;
  name: string;
}
@Component({
  selector: 'app-student-panel',
  templateUrl: './student-panel.component.html',
  styleUrls: ['./student-panel.component.scss']
})
export class StudentPanelComponent implements OnInit {
  
  title = 'app';

  userId: string;
  username: string;

  animal: string;
  name: string;

  dashboards:any = [];
  activeUsers:any =[];
  constructor(public dialog: MatDialog,private dash:DashboardService){
  
  }
 
  ngOnInit(){
    this.getDashRecord();
  }
  getDashRecord()
  {
   
    this.dash.getDashboard().subscribe(data=>{
     
      this.dashboards = data;
      this.activeUsers = data['active_user'];
      //console.log(data);
    });
  }
}
