import { Component, OnInit, Inject } from '@angular/core';
import { navItemsStudent } from '../../_nav';
import { DOCUMENT } from '@angular/common';
import { AuthService } from '../../shared/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-layout',
  templateUrl: './student-layout.component.html',
  styleUrls: ['./student-layout.component.scss']
})
export class StudentLayoutComponent implements OnInit {

  public navItems = navItemsStudent;
  public sidebarMinimized = true;
  private changes: MutationObserver;
  public element: HTMLElement;
  profilePic:string = localStorage.getItem('profilePic');
  constructor(@Inject(DOCUMENT) _document: any,private auth:AuthService,private router: Router) {

    this.changes = new MutationObserver((mutations) => {
      this.sidebarMinimized = _document.body.classList.contains('sidebar-minimized');
    });
    this.element = _document.body;
    this.changes.observe(<Element>this.element, {
      attributes: true,
      attributeFilter: ['class']
    });
  }
  ngOnInit(){
    
  }
  onLogout(){
    this.auth.setLogout().subscribe(data=>{
      this.router.navigate(['/login']);
    });
  }
  ngOnDestroy(): void {
    this.changes.disconnect();
  }
  
}
