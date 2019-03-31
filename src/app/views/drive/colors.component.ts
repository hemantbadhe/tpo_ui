import { Component, Inject, OnInit, DoCheck } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { getStyle, rgbToHex } from '@coreui/coreui/dist/js/coreui-utilities';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { DashboardService } from '../../shared/dashboard.service';

@Component({
  templateUrl: 'colors.component.html'
})
export class ColorsComponent implements OnInit,DoCheck {
  constructor(@Inject(DOCUMENT) private _document: any,private formBuilder: FormBuilder,private dash:DashboardService) {}
  public editorValue: string = 'Description Here';
  loading:boolean;
  msg:string='none';
  error:string;
  errmsg:string='none';
  public themeColors(): void {
    Array.from(this._document.querySelectorAll('.theme-color')).forEach((el: HTMLElement) => {
      const background = getStyle('background-color', el);
      const table = this._document.createElement('table');
      table.innerHTML = `
        <table class="w-100">
          <tr>
            <td class="text-muted">HEX:</td>
            <td class="font-weight-bold">${rgbToHex(background)}</td>
          </tr>
          <tr>
            <td class="text-muted">RGB:</td>
            <td class="font-weight-bold">${background}</td>
          </tr>
        </table>
      `;
      el.parentNode.appendChild(table);
    });
  }
  driveForm: FormGroup = new FormGroup({
    company_name: new FormControl(''),
    designation: new FormControl(''),
    package: new FormControl(''),
    criteria: new FormControl(''),
    drive_date: new FormControl(''),
    deadline: new FormControl(''),
    apply_link: new FormControl(''),
    description:new FormControl('')
  });
  ngDoCheck(){
    if(
      this.driveForm.value.company_name === '' ||
      this.driveForm.value.designation === '' ||
      this.driveForm.value.middleName === '' ||
      this.driveForm.value.package === '' ||
      this.driveForm.value.criteria === '' ||
      this.driveForm.value.drive_date === '' ||
      this.driveForm.value.deadline === '' ||
      this.driveForm.value.apply_link===''
    )
    {
      this.loading=true;
    }else
    {
      this.loading=false;

    }
  }
  ngOnInit(): void {
    this.themeColors();
  }
  onSubmit() {
  
    this.dash.insertDrive(this.driveForm.value).subscribe(data =>{
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
