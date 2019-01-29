import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, from } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VehiclesService {
  constructor(private http: HttpClient) { }

  getData() {
     return this.http.get('assets/data/vehicles.json').pipe(
       map((response) => {
            console.log('vehicles data: ' + response);
            return response;
        }
    ));

  }
}
