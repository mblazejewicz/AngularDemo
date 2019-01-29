import { Component, OnInit } from '@angular/core';
import { DataService, Person} from '../Services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  clickCount: number;
  h1Style: boolean;
  userData: Person[];
  users:  Person[];

  constructor(private data: DataService) { }

  ngOnInit() {

    this.clickCount = 0;
    this.h1Style = false;

    this.data.getLocalUsers().subscribe(data => {
      this.userData = data;
    });

    this.data.getUsers().subscribe(data => {
      this.users = data;
    });
  }

  firstClick() {
    this.clickCount += 1;
    this.h1Style = this.clickCount % 2 === 0;
  }

}
