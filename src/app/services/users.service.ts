
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private endPoint = environment.apiUrl;
  constructor(private _http: HttpClient) { }

  public login( data): any {
    const url = `${this.endPoint}login/`;
    return this._http.post(url, data).pipe(map(rep => rep));
  }

  public registro(usuario): any {
    const url = `${this.endPoint}usuarios/`;
    return this._http.post(url, usuario).pipe(map(rep => rep));
  }

}
