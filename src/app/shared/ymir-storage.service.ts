import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded'
  })
};

@Injectable({
  providedIn: 'root'
})
export class YmirStorageService {

  private __getImages = 'http://localhost:8000/api/images';
  private __addImage = 'http://localhost:8000/api/add';

  constructor(private httpClient: HttpClient) { }

  getPreviousImages() {
    return this.httpClient.get(this.__getImages);
  }

  addNewImage(params) {
    let httpParams = new HttpParams();
    httpParams = httpParams.append('filename', params.filename);
    httpParams = httpParams.append('path', params.path);
    httpParams = httpParams.append('data', params.data);
    return this.httpClient.post(this.__addImage, httpParams, httpOptions);
  }
}
