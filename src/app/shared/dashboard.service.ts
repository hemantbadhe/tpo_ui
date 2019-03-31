import { Injectable } from '@angular/core';

import { environment } from "../../environments/environment";
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, from } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

export const API_ENDPOINT_URL = environment['BASE_URL'] + environment['API_ENDPOINT'];
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};
@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http:HttpClient) { }
  private extractData(res: Response) {
    let body = res;
    return body || { };
  }
  insertPlacedStudent(student){
    return this.http.post(API_ENDPOINT_URL+'/placed_student/',student);
  }
  insertStudentInfo(student){
    return this.http.post(API_ENDPOINT_URL+'/college_student/',student);
  }
  insertDrive(drive){
    return this.http.post(API_ENDPOINT_URL+'/drives/',drive);
  }
  sendMessage(content){
    return this.http.post(API_ENDPOINT_URL+'/chat/',content);
  }
  getNotification(id){
    return this.http.get(API_ENDPOINT_URL+'/send_notification/?drive_id='+id).pipe(
      map(this.extractData));
  }
  getDashboardMsg(s,r):Observable<any> {
    return this.http.get(API_ENDPOINT_URL+'/chat/?sender='+s+'&receiver='+r).pipe(
      map(this.extractData));
  }
  getDashboard():Observable<any> {
    return this.http.get(API_ENDPOINT_URL+'/dashboard').pipe(
      map(this.extractData));
  }
  getStudentInfo():Observable<any> {
    return this.http.get(API_ENDPOINT_URL+'/college_student').pipe(
      map(this.extractData));
  }
  getDriveInfo():Observable<any> {
    return this.http.get(API_ENDPOINT_URL+'/drives').pipe(
      map(this.extractData));
  }
  getDriveDelete(id):Observable<any> {
    return this.http.delete(API_ENDPOINT_URL+'/drives/'+id+'/').pipe(
      map(this.extractData));
  }

  getStudentTPO():Observable<any> {
    return this.http.get(API_ENDPOINT_URL+'/tpo_student').pipe(
      map(this.extractData));
  }
  getTeacherTPO():Observable<any> {
    return this.http.get(API_ENDPOINT_URL+'/tpo_teacher').pipe(
      map(this.extractData));
  } 

}
