
import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../environment/environment';

const authFreeEndpoints: string[] = [
  "/auth/login",
  "/auth/register",
  "/auth/refresh",
];

const isAuthFreeEndpoint = (url: string): boolean => {
  return authFreeEndpoints.some((endpoint) => url.includes(endpoint));
};


export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem("accessToken");
  
  console.log('Interceptor token:', token ? 'Present' : 'Missing', 'req.url:', req.url); 

  if (!token) {
    return next(req);
  }

  
  if (!req.url.startsWith(environment.apiUrl)) {
    return next(req);
  }

  if (isAuthFreeEndpoint(req.url)) {
    return next(req);
  }

  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });

  return next(authReq);
};