import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment";
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
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
export class AuthService {

  constructor(private http:HttpClient) { }
  private extractData(res: Response) {
    let body = res;
    return body || { };
  }
 
  setLogin(user){
    return this.http.post(API_ENDPOINT_URL+'/login/',user);
  }
  setRegister(user){
    return this.http.post(API_ENDPOINT_URL+'/user/',user);
  }
  setLogout():Observable<any>{
    return this.http.get(API_ENDPOINT_URL+'/logout').pipe(
      map(this.extractData));
  }
  postFile(fileToUpload: File): Observable<any> {
    const endpoint = '/assets/upload/';
    const formData: FormData = new FormData();
    formData.append('fileKey', fileToUpload, fileToUpload.name);
    return this.http
      .post(endpoint, formData, { headers:{
        'Content-Type':  'application/json'
      }  });
      
 }
}
