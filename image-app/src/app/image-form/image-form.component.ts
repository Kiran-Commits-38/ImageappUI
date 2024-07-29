import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ImageService } from '../image.service';
import { Image } from '../image.model';

@Component({
  selector: 'app-image-form',
  templateUrl: './image-form.component.html',
  styleUrls: ['./image-form.component.css']
})
export class ImageFormComponent implements OnInit {
  @Input() image: Image | null = null;
  @Output() formSubmit = new EventEmitter<void>();

  imageForm: FormGroup;
  isEdit: boolean = false;

  constructor(private fb: FormBuilder, private imageService: ImageService) {
    this.imageForm = this.fb.group({
      user: ['', Validators.required],
      dateCreated: ['', Validators.required],
      description: ['', Validators.required],
      url: ['', [Validators.required, Validators.pattern('https?://.+')]]
    });
  }

  ngOnInit(): void {
    if (this.image) {
      this.isEdit = true;
      this.imageForm.patchValue(this.image);
    }
  }

  onSubmit(): void {
    if (this.imageForm.valid) {
      const image: Image = { ...this.image, ...this.imageForm.value };
      if (this.isEdit) {
        this.imageService.updateImage(image).subscribe(() => this.formSubmit.emit());
      } else {
        this.imageService.createImage(image).subscribe(() => this.formSubmit.emit());
      }
    }
  }

  onCancel(): void {
    this.formSubmit.emit();
  }
}
