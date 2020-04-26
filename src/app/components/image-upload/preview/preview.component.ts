import { Component, OnInit, Input } from '@angular/core';
import { SelectedFile } from '../image-upload.component';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.sass']
})
export class PreviewComponent implements OnInit {
  @Input() selectedFileData: SelectedFile;

  constructor() { }

  ngOnInit() {
  }

  transform(url) {
    if (url) {
      return `http://localhost:8000/${url}`;
    }
  }
}
