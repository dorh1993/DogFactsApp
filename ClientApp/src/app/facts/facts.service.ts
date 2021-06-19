import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class FactsService {

  constructor(private http: HttpClient) { }

  private rootURL = '/api';
  private httpOptions = {
    headers: new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }),
    reportProgress: false
  }

  // private params = new HttpParams()
  // .set('page', PageNo)

  public getFacts$(factType: string) {
    return this.http.get(this.rootURL + `/${factType}`).pipe(map(data => data));
  }

  public saveFacts$(data: any) {
    return this.http.post(this.rootURL + '/save-form', data, this.httpOptions).pipe(map(data => data));
   
  }

}
