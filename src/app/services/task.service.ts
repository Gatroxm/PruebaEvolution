import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private endPoint = environment.apiUrl;
  constructor(private _http: HttpClient) { }

  public get(idUsuario): any {
    const url = `${this.endPoint}task/${idUsuario}`;
    return this._http.get(url).pipe(map(rep => rep));
  }
  public create(tarea): any {
    const url = `${this.endPoint}task/`;
    return this._http.post(url, tarea).pipe(map(rep => rep));
  }
  public getId(id): any {
    const url = `${this.endPoint}task/tarea/${id}`;
    return this._http.get(url).pipe(map(rep => rep));
  }
  public delete(id): any {
    const url = `${this.endPoint}task/${id}`;
    return this._http.delete(url).pipe(map(rep => rep));
  }

  public edit(task): any {
    const url = `${this.endPoint}task/${task._id}`;
    return this._http.put(url, task).pipe(map(rep => rep));
  }
}
