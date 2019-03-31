import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../../shared/auth.service';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment.prod';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {
  msg:string; 
  forget_link:any;
  loading:boolean;
  registerForm: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });
  constructor(private auth:AuthService,private router: Router){

  }
  ngDoCheck(){
    if(
     
      this.registerForm.value.email === '' ||
      this.registerForm.value.password === '' 
    )
    {
      this.loading=true;
    }else
    {
      this.loading=false;

    }
  }
  ngOnInit() {
    this.msg='none';
    this.forget_link = 'http://localhost:9000/api/password/recover/';
   // console.log(this.forget_link);
  }
  onSubmit() {
   //console.log(this.registerForm.value);
   let user = {
    "email" :this.registerForm.value.email ,
    "password" : this.registerForm.value.password
    };
    
   this.auth.setLogin(user).subscribe(data=>{
     //console.log(data);
     if(data['status']===404)
     {
     this.msg='block';
     }
     else{
      localStorage.setItem('userId', data['data'].id);
      localStorage.setItem('profilePic',data['data'].profile_pic);
        if(data['data'].role==="TEACHER")
        {
          this.router.navigate(['/admin/dashboard']);
        }
        else{
          this.router.navigate(['/studentDash']);
        }
    }
   });
  }

}
