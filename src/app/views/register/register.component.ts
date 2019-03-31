import { Component, OnInit, DoCheck } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../../shared/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'register.component.html'
})
export class RegisterComponent implements OnInit,DoCheck{
  registerForm: FormGroup = new FormGroup({
    first_name: new FormControl(''),
    last_name: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    contact: new FormControl(''),
    dob: new FormControl(''),
    address: new FormControl(''),
    branch: new FormControl(''),
    department: new FormControl(''),
    role: new FormControl(''),
    i_card_no: new FormControl(''),
    academic_year: new FormControl(''),
    profile_pic: new FormControl(''),
    resume: new FormControl(''),
  });
  loading:boolean;
  msg:string='none';
  error:string;
  errmsg:string='none';
  fileToUpload:any;
  constructor(private auth:AuthService,private router: Router) { }
  ngDoCheck(){
   
  }
  ngOnInit(){
     
  }
  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
 }
  onSubmit() {
    //console.log(this.fileToUpload );
    this.auth.postFile(this.fileToUpload).subscribe(data => {
      // do something, if upload success
     // console.log(data);
      }, error => {
        //console.log(error);
      });
      let stu = {
        first_name:this.registerForm.value.first_name,
        last_name:this.registerForm.value.last_name,
        email:this.registerForm.value.email,
        password:this.registerForm.value.password,
        contact:this.registerForm.value.contact,
        dob:this.registerForm.value.dob,
        address:this.registerForm.value.address,
        branch:this.registerForm.value.branch,
        department:this.registerForm.value.department,
        aggregate:this.registerForm.value.aggregate,
        role:this.registerForm.value.role,
        i_card_no:this.registerForm.value.i_card_no,
        academic_year:this.registerForm.value.i_card_no,
        resume:this.registerForm.value.resume,
        profile_pic:this.registerForm.value.profile_pic
      };
    this.auth.setRegister(stu).subscribe(data=>{
         //console.log(data);
     if(data['status']===201)
     {
       this.msg='block';
       this.errmsg ='none';
     }else{
       this.msg='none';
       this.error = data['message'];
       this.errmsg ='block';
     }
    });
  }

}
