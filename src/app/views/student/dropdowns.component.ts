import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../shared/dashboard.service';
import { count } from 'rxjs/operators';

@Component({
  templateUrl: 'dropdowns.component.html',
  styleUrls: ['dropdowns.component.css']
})
export class DropdownsComponent implements OnInit{
  students:any=[];
  status: { isOpen: boolean } = { isOpen: false };
  disabled: boolean = false;
  isDropup: boolean = true;
  autoClose: boolean = false;
  totalItems: number = 50;
  currentPage: number   = 4;
  smallnumPages: number = 2;
  constructor(private dash:DashboardService) { }
  
  items: string[] = [
    'The first choice!',
    'And another choice for you.',
    'but wait! A third!'
  ];
  ngOnInit(){
    this.dash.getStudentInfo().subscribe(data=>{
      console.log(count(data.student_list));
     this.students=data.student_list;
     
    });
  }
  setPage(pageNo: number): void {
    this.currentPage = pageNo;
  }

  pageChanged(event: any): void {
    console.log('Page changed to: ' + event.page);
    console.log('Number items per page: ' + event.itemsPerPage);
  }
  onHidden(): void {
    console.log('Dropdown is hidden');
  }
  onShown(): void {
    console.log('Dropdown is shown');
  }
  isOpenChange(): void {
    console.log('Dropdown state is changed');
  }

  toggleDropdown($event: MouseEvent): void {
    $event.preventDefault();
    $event.stopPropagation();
    this.status.isOpen = !this.status.isOpen;
  }

  change(value: boolean): void {
    this.status.isOpen = value;
  }
}
