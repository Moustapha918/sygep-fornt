import {Injectable} from '@angular/core';
import {Router} from "@angular/router";
import {TokenStorageService} from "./token-storage.service";
import {Observable} from "rxjs/Observable";
import {HttpInterceptor, HttpRequest, HttpHandler, HttpSentEvent, HttpHeaderResponse, HttpProgressEvent,
  HttpResponse, HttpUserEvent, HttpErrorResponse} from '@angular/common/http';
import 'rxjs/add/operator/do';
import { environment } from "../../environments/environment";

const TOKEN_HEADER_KEY = 'Authorization';

@Injectable()
export class InterceptorService implements HttpInterceptor {

  constructor(private token: TokenStorageService, private router: Router) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>> {
    console.log('-----------------interceptor')
    console.log(req)
    let authReq = req;

    if (this.token.getToken() != null && req.url != 'users/signin') {
      authReq = req.clone(
        {
          headers: req.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + this.token.getToken()),
          url: environment.backendUrl + req.url
        });
    }else {
      authReq = req.clone(
        {
      url: environment.backendUrl + req.url
    });
    }
    return next.handle(authReq)
  .do(
      (err: any) => {

        if (err instanceof HttpErrorResponse) {

          if (err.status !== 200) {
            this.router.navigate(['user']);
          }
        }
      });
  }
}
