import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {HttpClient} from "@angular/common/http";;

@Injectable()
export class AuthService {


  constructor(private http: HttpClient) {
  }

  login(ussername: string, password: string): Observable<any> {
    const credentials = {username: ussername, password: password};
    console.log('attempAuth----------------');
    let result = this.http.post("users/signin", credentials) ;
    return result;
  }

}
