import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class YmirStorageService {

  private __getImages = 'http://localhost:8000/api/images';
  private __addImage = 'http://localhost:8000/api/images';

  constructor(private httpClient: HttpClient) { }

  getPreviousImages() {
    return this.httpClient.get(this.__getImages);
  }

  addNewImage(params) {
    let formData = new FormData();
    formData.append('fileName', params.fileName);
    formData.append('imageFile', params.imageFile);
    formData.append('textOnImage', params.textOnImage);
    return this.httpClient.post(this.__addImage, formData);
  }
}
