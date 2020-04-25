import { Component, OnInit } from '@angular/core';
import { YmirStorageService } from 'src/app/shared/ymir-storage.service';

export interface apiResponse {
  message: string;
  data: Array<any>;
  error?
};

@Component({
  selector: 'app-previous-uploads',
  templateUrl: './previous-uploads.component.html'
})
export class PreviousUploadsComponent implements OnInit {

  selectedImageId = null;
  previousImages = [];

  constructor(private ymirStorageService: YmirStorageService) { }

  ngOnInit() { }

  onSelectImage(id) {
    return this.selectedImageId = (this.selectedImageId === id) ? null : id;
  }

  displayPreviousImages() {
    this.ymirStorageService
      .getPreviousImages()
      .subscribe((response: apiResponse) => {
        if (response) {
          this.previousImages = response.data;
        }
      });
  }

}
