import { Component, OnInit } from '@angular/core';
import { ImageService } from '../image.service';
import { Image } from '../image.model';

@Component({
  selector: 'app-image-list',
  templateUrl: './image-list.component.html',
  styleUrls: ['./image-list.component.css']
})
export class ImageListComponent implements OnInit {
  images: Image[] = [];

  constructor(private imageService: ImageService) {}

  ngOnInit(): void {
    this.loadImages();
  }

  loadImages(): void {
    this.imageService.getImages().subscribe((images) => {
      this.images = images;
    });
  }

  createImage(): void {
    // Logic to open image creation form
  }

  editImage(image: Image): void {
    // Logic to open image edit form
  }

  deleteImage(id: number): void {
    this.imageService.deleteImage(id).subscribe(() => {
      this.loadImages();
    });
  }
}
