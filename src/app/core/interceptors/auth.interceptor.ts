import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
// On supprime l'importation de l'opérateur "tap" devenu inutile.
 
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
 
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this.isPublicRequest(request.url)) {
        request = this.addToken(request, localStorage.getItem('token')!);
    }
    request = this.addContentType(request); // On utilise notre nouvelle méthode 'addContentType'.
 
    return next.handle(request); // On supprime l'utilisation de 'console.log'.
  }

  private isPublicRequest(url: string): boolean {
    return (url.includes('verifyPassword') || url.includes('signupNewUser'));
   }
 
  private addContentType(request: HttpRequest<any>): HttpRequest<any> {
    return request.clone({
      setHeaders: {
        'Content-Type': 'application/json'
      }
    });    
  }

  private addToken(request: HttpRequest<any>, token: string): HttpRequest<any> {
    return request.clone({
     setHeaders: {
      'Authorization': `Bearer ${token}`
     }
    });
  }

}