import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecommedService {

  constructor(private http: HttpClient) { }
  getAllRecommendation(movieName: string): Observable<any> {
    let dataUrl = `http://127.0.0.1:5000/recommend/${movieName}`
    return this.http.get<any>(dataUrl);
  }
  getAllMovie(): Observable<any> {
    let dataUrl = `http://127.0.0.1:5000/moviesList`
    return this.http.get<any>(dataUrl);
  }
}
