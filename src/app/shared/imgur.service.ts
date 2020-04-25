import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/xml',
    'Authorization': 'Client-ID cf9caf7328c4276'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ImgurService {

  private __addImage = 'https://api.imgur.com/3/upload';

  constructor(private httpClient: HttpClient) { }

  uploadNewImage(image: string) {
    return this.httpClient.post(this.__addImage, { image: image }, httpOptions);
  }
}
