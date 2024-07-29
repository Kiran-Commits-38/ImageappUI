import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SafeUrl } from '@angular/platform-browser';
import * as bootstrap from 'bootstrap';
import { ApiService } from './services/api.service';

interface Image {
  id: number;
  url: SafeUrl;
  user: string;
  dateCreated: Date;
  description: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title(title: any) {
    throw new Error('Method not implemented.');
  }
  imageForm: FormGroup;
  imageList: Image[] = [ ];
  nextId: number = 1; // For generating unique IDs
  editingImageId: number | null = null;

  constructor(private fb: FormBuilder, private apiservice: ApiService) {
    this.imageForm = this.fb.group({
      userName: ['', Validators.required],
      createDate: ['', Validators.required],
      description: ['', Validators.required],
      imageURL: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.apiservice.getImageList().subscribe(
      (res) => {
        this.imageList = res;
        console.log('imgData=>', this.imageList);
      },
      (err) =>{
        console.error('Error fetching data:', err);
      }
    ); 
  }

  

  postImage(imageData: any): void {
    this.apiservice.postImage(imageData).subscribe(
      (res) => {
        console.log('Image posted successfully:', res);
        this.getImages(); 
        this.imageForm.reset();
      },
      (err) => {
        console.error('Error posting data:', err);
      }
    );
  }
  getImages() {
    throw new Error('Method not implemented.');
  }

  submitForm(): void {
    const formValue = this.imageForm.value;
  
    const newImage: Image = {
      id: this.nextId++,
      url: formValue.imageUrl,
      user: formValue.userName,
      dateCreated: new Date(formValue.createDate),
      description: formValue.description
    };
  
    this.imageList.push(newImage);
  
    // Reset the form
    this.imageForm.reset();
    // Reset the file input field
  // const fileInput: HTMLInputElement = document.getElementById('image') as HTMLInputElement;
  // if (fileInput) {
  //   fileInput.value = ''; // Clear the file input value
  // }

  
    // Close the modal
    // const modalElement = document?.getElementById('uploadModal');
    // if (modalElement) {
    //   const modal = bootstrap?.Modal?.getInstance(modalElement);
    //   if (modal) {
    //     modal.hide();
    //   }
    // }
  }
  

  // onFileChange(event: any): void {
  //   const file = event.target.files[0];
  //   if (file) {
  //     this.imageForm.patchValue({
  //       image: file
  //     });
  //   }
  // }

  editImage(image: Image): void {
    // Pre-fill the form with image data
    this.imageForm.patchValue({
      userName: image.user,
      createDate: image.dateCreated,
      description: image.description
      // Optionally allow changing the image: image: null
    });

    // Store the edited image ID temporarily for update
    this.editingImageId = image.id;

    // Open the modal (if not already open)
    const modalElement = document.getElementById('uploadModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  deleteImage(image: Image): void {
    // Logic to handle image deletion
    if (confirm('Are you sure you want to delete this image?')) {
      this.imageList = this.imageList.filter(img => img.id !== image.id);
    }
  }
}
