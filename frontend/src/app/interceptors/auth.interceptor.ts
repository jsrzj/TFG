import { HttpInterceptorFn } from '@angular/common/http';
import { request } from 'http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  let clonedRequest = req;

  /*if (localStorage.getItem("token_peliculas")) {
    clonedRequest = request.clone({
      setHeaders: {
        Authorization: localStorage.getItem("token_peliculas")!
      }
    })
  }*/

  return next(clonedRequest);
};
