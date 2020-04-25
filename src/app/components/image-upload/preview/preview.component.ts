import { Component, OnInit, Input } from '@angular/core';
import { SelectedFile } from '../image-upload.component';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.sass']
})
export class PreviewComponent implements OnInit {
  @Input() selectedFile: SelectedFile;

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit() {
  }

  transform(url) {
    if (url) {
      return this.sanitizer.bypassSecurityTrustUrl(url);
    }
  }
}
