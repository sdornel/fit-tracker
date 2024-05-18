import { TestBed } from "@angular/core/testing";
import { AuthInterceptor } from "./auth.interceptor";
import { Observable, of } from "rxjs";
import { HttpEvent, HttpHandler, HttpRequest } from "@angular/common/http";

describe('AuthInterceptor', () => {
    let interceptor: AuthInterceptor;
    
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          AuthInterceptor
        ]
      });
      interceptor = TestBed.inject(AuthInterceptor);
    });
  
    it('should add withCredentials to the request', () => {
      const request = new HttpRequest('GET', '/test');
      const next: HttpHandler = {
        handle: (req: HttpRequest<any>): Observable<HttpEvent<any>> => {
          return of({} as HttpEvent<any>);
        }
      };
  
      spyOn(next, 'handle').and.callThrough();
  
      interceptor.intercept(request, next).subscribe();
  
      expect(next.handle).toHaveBeenCalledWith(jasmine.objectContaining({
        withCredentials: true
      }));
    });
});