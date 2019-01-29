import { Injectable } from '@angular/core';
import { Observable, of, from } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
export class Person implements IPerson {
  name: string;
  lastName?: string;
  age: number;
  avatar?: string;
  address?: string;
  isAvailable?: boolean;
  constructor(name: string, lastName: string, avatar?: string) {
    this.name = name;
    this.lastName = lastName;
    this.avatar = avatar;
  }
}

export interface IPerson {
  name: string;
  lastName?: string;
  age: number;
  avatar?: string;
  address?: string;
  isAvailable?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private http: HttpClient) {
    // tslint:disable-next-line:no-debugger
    debugger;
  }

  getLocalUsers(): Observable<IPerson[]> {
    const users: IPerson[] = [
      { name: 'Jhon', age: 12, address: 'Sommer str. 12/22', isAvailable: true },
      { name: 'Edd', age: 42, address: 'Blv str. 12 ', isAvailable: false },
      { name: 'Assier', age: 33, address: 'White str. 2w ', isAvailable: false },
      { name: 'Sor', age: 52, address: 'Asd str. ', isAvailable: true }
    ];
    return of(users);
  }

  getUsers(): Observable<Person[]> {

    const usersarray = this.http.get('https://reqres.in/api/users').toPromise()
      .then(response => response)
      .then(o => {
        return ((o as any).data as Array<any>).map((item) => new Person(item.first_name, item.last_name, item.avatar));
      }
      );

    const usersarrayobs = from(usersarray);
    setInterval(() => {
      usersarrayobs.subscribe((arr) => {
        arr.forEach(item => {
          item.isAvailable = !item.isAvailable;
        });
      });
    }, 1000);
    return usersarrayobs;
    // reqres.in is a free public API that we can use to grab data.
    //  return this.http.get('https://reqres.in/api/users');
  }
  handleError(arg0: any): (err: any, caught: Observable<Object>) => never {
    throw new Error('Method not implemented.');
  }
}
