import { Component, OnInit, DoCheck } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { DashboardService } from '../../shared/dashboard.service';
@Component({
  templateUrl: 'buttons.component.html'
})
export class ButtonsComponent implements OnInit,DoCheck{
  
  submitted = false;
  loading:boolean;
  msg:string='none';
  error:string;
  errmsg:string='none';
  constructor(private formBuilder: FormBuilder,private dash:DashboardService) { }
  registerForm: FormGroup = new FormGroup({
    firstName: new FormControl('',[
      Validators.required]),
    lastName: new FormControl(''),
    email: new FormControl(''),
    middleName: new FormControl(''),
    contact: new FormControl(''),
    dateBirth: new FormControl(''),
    role: new FormControl('STUDENT'),
    iCard: new FormControl(''),
    admissionYear: new FormControl(''),
    deparment: new FormControl('')
  });
  ngDoCheck(){
    if(
      this.registerForm.value.iCard === '' ||
      this.registerForm.value.firstName === '' ||
      this.registerForm.value.middleName === '' ||
      this.registerForm.value.lastName === '' ||
      this.registerForm.value.email === '' ||
      this.registerForm.value.contact === '' ||
      this.registerForm.value.deparment === '' ||
      this.registerForm.value.admissionYear===''
    )
    {
      this.loading=true;
    }else
    {
      this.loading=false;

    }
  }
  ngOnInit() {
    

   }
  onSubmit() {
    //console.log(this.registerForm);
   let student = {
    "i_card_no" : this.registerForm.value.iCard,
    "first_name" : this.registerForm.value.firstName,
    "middle_name" : this.registerForm.value.middleName,
    "last_name" : this.registerForm.value.lastName,
    "email" : this.registerForm.value.email,
    "contact" : this.registerForm.value.contact,
    "department" : this.registerForm.value.deparment,
    "admission_year" : this.registerForm.value.admissionYear,
    "role" : this.registerForm.value.role
   };

   this.dash.insertStudentInfo(student).subscribe(data =>{
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
