import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class GoogleVisionService {

  // uploadImage(file: File): Observable<any> {
  //   // return this.httpClient.post<any>(apiUrl, data, httpOptions);
  // }

  constructor(private httpClient: HttpClient) { }
}
