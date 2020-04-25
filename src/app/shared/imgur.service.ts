import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { throwError } from 'rxjs/internal/observable/throwError';
import { retry, catchError } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Authorization': 'Client-ID cf9caf7328c4276'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ImgurService {

  private __addImage = 'https://api.imgur.com/3/upload';

  constructor(private httpClient: HttpClient) { }

  uploadNewImage(image: string | ArrayBuffer): Observable<any> {
    return this.httpClient.post(this.__addImage, { image: image }, httpOptions);
  }

}
