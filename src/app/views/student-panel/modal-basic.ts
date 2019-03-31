import {Component, Input, ViewChild, ElementRef, OnInit, DoCheck, OnDestroy} from '@angular/core';
import { timer, Observable, Subject } from 'rxjs';
import { switchMap, takeUntil, catchError } from 'rxjs/operators';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { DashboardService } from '../../shared/dashboard.service';
declare var $ : any;

@Component({
  selector: 'ngbd-modal-basic',
  templateUrl: './modal-basic.html',
  styleUrls: ['./modal-basic.scss']
})
export class NgbdModalBasic implements OnInit,DoCheck,OnDestroy {
  closeResult: string;
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;
  @Input('recId') recId:any;
  @Input('recName') recName:any;
  @ViewChild('chat_msg') chat_msg:ElementRef;
  messages:any=[];
  userId:any = localStorage.getItem('userId');
  finalSender:any;
  finalRec:any;
  nm:any;
  lastmsg:any=[];
  changecount:any;
  start:any;
  constructor(private modalService: NgbModal,private dash:DashboardService) {}
  ngDoCheck(){
    if(this.start === 1)
    {    
       
    }
 
 }

     ngOnInit() {
    
      this.scrollToBottom();
      window.setInterval(function() {
        // method to be executed;
        this.dash.getDashboardMsg(this.finalSender,this.finalRec).subscribe(data=>{
                
          this.messages =data.messages;
          this.scrollToBottom();
        });    
      }, 3000);     
     }
    ngOnDestroy(){
      clearInterval();
    }
     ngAfterViewChecked() {        
      this.scrollToBottom();        
     } 
     scrollToBottom(): void {
      try {
          this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
      } catch(err) { }                 
    }
 send(s,r,msg:HTMLInputElement){
  //console.log('msg_late'+msg.value);
  let data ={
    "sender" : s,
    "receiver": r,
    "message": msg.value
    };
  this.dash.sendMessage(data).subscribe(data=>{
   //console.log(data);
   $('#msgs').empty();
  });
}
  open(content) {
    this.finalSender=this.userId;
    this.finalRec = this.recId;
    this.start = 1;
  
    this.modalService.open(content,{ size: 'lg',centered: true ,ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
}
