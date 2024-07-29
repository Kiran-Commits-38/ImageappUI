import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Image } from '../image.model';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private getImagesUrl = 'http://localhost:5141/api/Images';
  private postImageUrl = 'http://localhost:5141/api/Images';
  private putImageUrl = 'http://localhost:5141/api/Images/id';
  
  
  
  constructor(private http: HttpClient) { }
  // Method to get a list of images

  getImageList(): Observable<any>  {
    return this.http.get<any>(this.getImagesUrl);
  }
  // Method to post a new image
  postImage(imageData: any): Observable<any> {
    return this.http.post<any>(this.postImageUrl, imageData);
  }

  // Method to update an image
  updateImage(imageData: any): Observable<any> {
    // Assuming `imageData` contains an `id` property to identify which image to update
    const url = `${this.putImageUrl}/${imageData.id}`;
    return this.http.put<any>(url, imageData);
  }

  // Method to delete an image
  deleteImage(id: number): Observable<any> {
    const url = `${this.putImageUrl}/${id}`;
    return this.http.delete<any>(url);
  }

} 
