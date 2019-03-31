import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../shared/dashboard.service';

@Component({
  templateUrl: 'typography.component.html'
})
export class TypographyComponent implements OnInit{
  drives:any = [];
  constructor(private dash:DashboardService) { }

  ngOnInit(){
    this.dash.getDriveInfo().subscribe(data=>{
      this.drives = data.drive_list;
    });
  }
  send(id){
    this.dash.getNotification(id).subscribe(data=>{
      
    });
  }
  delete(id){
    this.dash.getDriveDelete(id).subscribe(data=>{
     //console.log(data);
    });
    this.dash.getDriveInfo().subscribe(data=>{
      this.drives = data.drive_list;
    });
  }
  
}
