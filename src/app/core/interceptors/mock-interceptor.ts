import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, delay, of } from "rxjs";
import { loginApiPath } from "src/app/shared";
import { UserMock } from "../mocks";

@Injectable()
export class MockInterceptor implements HttpInterceptor {
  private mocks: [string, string, any[]] = [
    loginApiPath, 'GET', UserMock.get as any  
  ];

  constructor() { }
  
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const data = this.getMock(req.url, req.method);
    return data ? of(new HttpResponse({
      status: 200,
      body: data
    })).pipe(delay(500)) : next.handle(req);
  }

  private getMock(url: string, method: string): any { 
    return this.mocks.find(mock => url.indexOf(mock[0]) === 0 && method === mock[1])?.[2];
  }
}