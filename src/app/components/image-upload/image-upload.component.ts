import { Component, OnInit } from '@angular/core';
// import { GoogleVisionService } from 'src/app/shared/google-vision.service';
import { ImgurService } from 'src/app/shared/imgur.service';
import { YmirStorageService } from 'src/app/shared/ymir-storage.service';

export interface SelectedFile {
  filename: string;
  path: string | ArrayBuffer;
  size: number;
  data: string;
}

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styles: [``]
})
export class ImageUploadComponent implements OnInit {

  private base64textString: string;
  selectedFile: SelectedFile;

  constructor(
    private ymirStorageService: YmirStorageService,
    private imgurService: ImgurService
  ) {
    this.selectedFile = {
      filename: null,
      path: null,
      size: 0,
      data: null
    };
  }

  ngOnInit() { }

  onSelectFile(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      const file = event.target.files[0];
      this.selectedFile.filename = file.name;
      this.selectedFile.size = file.size;

      // check if file size is under limit
      if (!this.validateFileSize(file.size)) {
        console.log('Select a file with size less than 5 MB');
        return false;
      }

      //check file is valid
      if (!this.validateFile(file.type)) {
        console.log('Selected file format is not supported');
        return false;
      }

      // read file as data url
      reader.readAsDataURL(file);

      // called once readAsDataURL is completed
      reader.onload = (evt: any) => {
        // here it should be an CDN URL
        this.selectedFile.path = evt.target.result;
        this.base64textString = btoa(evt.target.result);

        // this.uploadImageToImgur()
        this.addImageEntryToDatabase();
      }
    }
  }

  /**
   * Adds the entry of the selected file to database
   */
  addImageEntryToDatabase() {
    const currentTimeStamp = new Date().getTime();
    const newFileName = `${currentTimeStamp}-${this.selectedFile.filename}`;
    const params = {
      filename: newFileName,
      path: this.selectedFile.path,
      data: 'Lorem Ipsum Dolar Sit Emet Brngas Der Kpels Altraa Bingduss'
    };

    this.ymirStorageService
      .addNewImage(params)
      .subscribe((response: any) => {
        if (response) {
          this.selectedFile.data = response.data.data;
        }
      });
  }

  /**
   * Sends the user selected image to Imgur API for storage
   */
  // uploadImageToImgur() {
  //   this.imgurService
  //     .uploadNewImage(this.base64textString)
  //     .subscribe((response: any) => {
  //       console.log(response);
  //       if (response) {
  //         console.log(response.data.link);
  //       }
  //     });
  // }

  /**
   * Validates the size of the updated file
   * If the size is more than 5MB then an error is thrown
   * @param fileSize The size of the uploaded file
   */
  validateFileSize(fileSize: number) {
    return fileSize < 2000000;
  }

  /**
   * Validates the uploaded file. 
   * Returns true if image or else false
   * @param fileType The file format/type
   */
  validateFile(fileType: String) {
    const allowedExtensions = ['png', 'jpg', 'jpeg'];

    var ext = fileType.split('/')[1].toLowerCase();
    if (allowedExtensions.indexOf(ext) > -1) {
      return true;
    }
    return false;
  }

}
