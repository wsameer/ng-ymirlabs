import { Component, OnInit } from '@angular/core';
import { YmirStorageService } from 'src/app/shared/ymir-storage.service';

export interface apiResponse {
  message: string;
  data: Array<UploadedImages>;
  error?
};

export interface UploadedImages {
  fileName: string;
  id: number;
  imageFile: string;
  textOnImage: string;
}

@Component({
  selector: 'app-previous-uploads',
  templateUrl: './previous-uploads.component.html'
})
export class PreviousUploadsComponent implements OnInit {

  selectedImageId = null;
  previousImages: Array<UploadedImages>;

  constructor(private ymirStorageService: YmirStorageService) {
    this.previousImages = [];
  }

  ngOnInit() { }

  onSelectImage(id) {
    return this.selectedImageId = (this.selectedImageId === id) ? null : id;
  }

  displayPreviousImages() {
    this.selectedImageId = null;
    this.ymirStorageService
      .getPreviousImages()
      .subscribe((response: apiResponse) => {
        if (response) {
          this.previousImages = response.data;
        }
      });
  }
}
