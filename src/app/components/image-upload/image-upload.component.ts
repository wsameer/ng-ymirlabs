import { Component, OnInit } from '@angular/core';
// import { GoogleVisionService } from 'src/app/shared/google-vision.service';
import { ImgurService } from 'src/app/shared/imgur.service';

class ImageSnippet {
  pending: boolean = false;
  status: string = 'init';

  constructor(public src: string | ArrayBuffer, public file: File) { }
}

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styles: [``]
})
export class ImageUploadComponent implements OnInit {

  selectedFile: ImageSnippet;

  constructor(
    private imgurService: ImgurService
  ) { }

  ngOnInit() { }

  private base64textString = '';

  onSelectFile(event: any) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();

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
      // reader.readAsDataURL(file);
      reader.readAsBinaryString(file);

      // called once readAsDataURL is completed
      reader.onload = (evt: any) => {
        if (evt.target) {
          this.selectedFile = new ImageSnippet(evt.target.result, file);
          this.base64textString = btoa(evt.target.result);
          console.log(this.selectedFile);
        }
      }
    }
  }

  uploadImageToImgur() {
    this.imgurService.uploadNewImage(this.base64textString).subscribe(response => console.log(response));
  }


  /**
   * Sends the uploaded file to Google Vision API and checks for the response
   * @param fileData The upload file
   */
  readTextOnImage(fileData) {
    // return this.googleVisionService.uploadImage(this.selectedFile.file)
    // .subscribe(
    //   (res) => {
    //     this.onSuccess();
    //   },
    //   (err) => {
    //     this.onError();
    //   });

  }

  validateFileSize(fileSize: number) {
    return fileSize < 5000000;
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
