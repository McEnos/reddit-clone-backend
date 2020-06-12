import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SignUpRequestPayload} from '../../models/signup-request.payload';
import {Observable} from 'rxjs';
import {LoginRequestPayload} from '../../models/login-request-payload';
import {LoginResponsePayload} from '../../models/login-response.payload';
import {map} from 'rxjs/operators';
import {LocalStorageService} from 'ngx-webstorage';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private localStorage: LocalStorageService) {
  }

  signUp(signupRequestPayload: SignUpRequestPayload): Observable<any> {
    return this.http.post('http://localhost:8050/api/auth/signup', signupRequestPayload, {responseType: 'text'});
  }

  login(loginRequestPayload: LoginRequestPayload): Observable<boolean> {
    return this.http.post<LoginResponsePayload>('http://localhost:8050/api/auth/login', loginRequestPayload)
      .pipe(map(data => {
        this.localStorage.store('authenticationToken', data.authenticationToken);
        this.localStorage.store('username', data.username);
        this.localStorage.store('refreshToken', data.refreshToken);
        this.localStorage.store('expiresAt', data.expiresAt);
        return true;
      }));
  }
}
