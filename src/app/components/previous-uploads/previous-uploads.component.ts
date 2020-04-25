import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-previous-uploads',
  templateUrl: './previous-uploads.component.html'
})
export class PreviousUploadsComponent implements OnInit {

  previousImages = [];

  constructor() { }

  ngOnInit() {
  }

  displayPreviousImages() {
    // API call
    this.previousImages = [{
      name: 'image 1',
      path: './image1.png',
      textOnImage: 'Image 1'
    },{
      name: 'image 2',
      path: './image2.png',
      textOnImage: 'Image 2'
    },{
      name: 'image 3',
      path: './image3.png',
      textOnImage: 'Image 3'
    },{
      name: 'image 4',
      path: './image4.png',
      textOnImage: 'Image 4'
    }];

  }

}
