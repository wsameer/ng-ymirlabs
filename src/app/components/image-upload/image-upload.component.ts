import { Component, OnInit } from '@angular/core';
// import { GoogleVisionService } from 'src/app/shared/google-vision.service';
import { ImgurService } from 'src/app/shared/imgur.service';
import { YmirStorageService } from 'src/app/shared/ymir-storage.service';

export interface SelectedFile {
  fileName: string;
  imageFile: string; // this is the path of the uploaded image
  textOnImage: string;
}

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styles: [``]
})
export class ImageUploadComponent implements OnInit {
  selectedFileData: SelectedFile;
  selectedFilesTempPath: string | ArrayBuffer;
  selectedImageFile: File;

  constructor(
    private ymirStorageService: YmirStorageService,
    private imgurService: ImgurService
  ) {
    this.selectedFileData = {
      fileName: null,
      imageFile: null,
      textOnImage: null
    };
  }

  ngOnInit() { }

  onSelectFile(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      this.selectedImageFile = event.target.files[0];
      const currentTimeStamp = new Date().getTime();

      // check if file size is under limit
      if (!this.validateFileSize(this.selectedImageFile.size)) {
        console.log('Select a file with size less than 5 MB');
        return false;
      }

      //check file is valid
      if (!this.validateFile(this.selectedImageFile.type)) {
        console.log('Selected file format is not supported');
        return false;
      }

      this.selectedFileData.fileName = `${currentTimeStamp}_${this.selectedImageFile.name}`;
      this.selectedFileData.textOnImage = "Some dummy text on the image";

      // read file as data url
      reader.readAsDataURL(this.selectedImageFile);

      // called once readAsDataURL is completed
      reader.onload = (evt: any) => {
        this.selectedFilesTempPath = evt.target.result;
        this.addImageEntryToDatabase();
      }
    }
  }

  /**
   * Adds the entry of the selected file to database
   */
  addImageEntryToDatabase() {
    const params = {
      fileName: this.selectedFileData.fileName,
      imageFile: this.selectedImageFile,
      textOnImage: this.selectedFileData.textOnImage
    };

    this.ymirStorageService
      .addNewImage(params)
      .subscribe((response: any) => {
        if (response) {
          this.selectedFileData.imageFile = response.data.imageFile;
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
    return fileSize < (1024 * 1024 * 5);
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
