import { Component, OnInit, Input, ViewChild, ElementRef, DoCheck, OnDestroy } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { DashboardService } from '../../../shared/dashboard.service';
declare var $ : any;
@Component({
  selector: 'app-model-dialog',
  templateUrl: './model-dialog.component.html',
  styleUrls: ['./model-dialog.component.scss']
})
export class ModelDialogComponent implements OnInit,DoCheck,OnDestroy {
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;
  closeResult: string;
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
  constructor(private modalService: NgbModal,private dash:DashboardService) {}
  send(s,r,msg:HTMLInputElement){
    //console.log('msg_late'+msg.value);
    let data ={
      "sender" : s,
      "receiver": r,
      "message": msg.value
      };
    this.dash.sendMessage(data).subscribe(data=>{
    // console.log(data);
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
