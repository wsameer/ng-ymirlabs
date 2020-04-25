import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'image-details',
  templateUrl: './image-details.component.html',
  styles: [`
    .selected-image-details .card-img-top {
      max-width: 100%;
      max-height: 100%;
      object-fit: cover;
    }
  `]
})

export class ImageDetailsComponent implements OnInit {
  @Input() image;
  constructor() { }

  ngOnInit() { }
}