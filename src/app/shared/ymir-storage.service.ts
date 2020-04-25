import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class YmirStorageService {

  private __getImages = 'http://localhost:8000/api/images';
  private __addImage = 'http://localhost:8000/api/add/';

  constructor(private httpClient: HttpClient) { }

  getPreviousImages() {
    return this.httpClient.get(this.__getImages);
  }

  // addNewImage(params) {
  //   return this.httpClient.post(this.__addImage, params);
  // }
}
