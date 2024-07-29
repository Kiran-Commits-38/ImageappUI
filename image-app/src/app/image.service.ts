import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Image } from './image.model';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  private apiUrl = 'http://localhost:3000/images'; // Adjust API URL as needed

  constructor(private http: HttpClient) {}

  getImages(): Observable<Image[]> {
    return this.http.get<Image[]>(this.apiUrl);
  }

  getImage(id: number): Observable<Image> {
    return this.http.get<Image>(`${this.apiUrl}/${id}`);
  }

  createImage(image: Image): Observable<Image> {
    return this.http.post<Image>(this.apiUrl, image);
  }

  updateImage(image: Image): Observable<Image> {
    return this.http.put<Image>(`${this.apiUrl}/${image.id}`, image);
  }

  deleteImage(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
