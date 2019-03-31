import { Component, SecurityContext, ViewEncapsulation, OnInit, DoCheck } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { AlertConfig } from 'ngx-bootstrap/alert';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { DashboardService } from '../../shared/dashboard.service';

// such override allows to keep some initial values

export function getAlertConfig(): AlertConfig {
  return Object.assign(new AlertConfig(), { type: 'success' });
}

@Component({
  templateUrl: 'alerts.component.html',
  styleUrls:['alerts.component.scss'],
  encapsulation: ViewEncapsulation.None,
  styles: [
    `
  .alert-md-local {
    background-color: #009688;
    border-color: #00695C;
    color: #fff;
  }
  `
  ],
  providers: [{ provide: AlertConfig, useFactory: getAlertConfig }]
})
export class AlertsComponent implements OnInit,DoCheck {

  loading:boolean;
  msg:string='none';
  error:string;
  errmsg:string='none';
  constructor(sanitizer: DomSanitizer,private formBuilder: FormBuilder,private dash:DashboardService) {
    this.alertsHtml = this.alertsHtml.map((alert: any) => ({
      type: alert.type,
      msg: sanitizer.sanitize(SecurityContext.HTML, alert.msg)
    }));
  }
   placeForm: FormGroup = new FormGroup({
    company_name: new FormControl(''),
    designation: new FormControl(''),
    package: new FormControl(''),
    location: new FormControl(''),
    joining_date: new FormControl(''),
    placement_date: new FormControl(''),
    i_card: new FormControl(''),
  });
  dismissible = true;
  alerts: any = [
    {
      type: 'success',
      msg: `You successfully read this important alert message.`
    },
    {
      type: 'info',
      msg: `This alert needs your attention, but it's not super important.`
    },
    {
      type: 'danger',
      msg: `Better check yourself, you're not looking too good.`
    }
  ];

  alertsHtml: any = [
    {
      type: 'success',
      msg: `<strong>Well done!</strong> You successfully read this important alert message.`
    },
    {
      type: 'info',
      msg: `<strong>Heads up!</strong> This alert needs your attention, but it's not super important.`
    },
    {
      type: 'danger',
      msg: `<strong>Warning!</strong> Better check yourself, you're not looking too good.`
    }
  ];

  index = 0;
  messages = [
    'You successfully read this important alert message.',
    'Now this text is different from what it was before. Go ahead and click the button one more time',
    'Well done! Click reset button and you\'ll see the first message'
  ];

  alertsDismiss: any = [];

  reset(): void {
    this.alerts = this.alerts.map((alert: any) => Object.assign({}, alert));
  }

  changeText() {
    if (this.messages.length - 1 !== this.index) {
      this.index++;
    }
  }

  add(): void {
    this.alertsDismiss.push({
      type: 'info',
      msg: `This alert will be closed in 5 seconds (added: ${new Date().toLocaleTimeString()})`,
      timeout: 5000
    });
  }
  ngDoCheck(){
    if(
      this.placeForm.value.i_card === '' ||
      this.placeForm.value.company_name === '' ||
      this.placeForm.value.designation === '' ||
      this.placeForm.value.location === '' ||
      this.placeForm.value.joining_date === '' ||
      this.placeForm.value.placement_date === ''      
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
    let placed_data = {
      "student_i_card_no":this.placeForm.value.i_card,
      "company_name":this.placeForm.value.company_name,
      "designation":this.placeForm.value.designation,
      "location":this.placeForm.value.location,
      "joining_date":this.placeForm.value.joining_date,
      "placement_date":this.placeForm.value.placement_date
    };
    //console.log(this.placeForm.value);
     this.dash.insertPlacedStudent(placed_data).subscribe(data=>{
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
