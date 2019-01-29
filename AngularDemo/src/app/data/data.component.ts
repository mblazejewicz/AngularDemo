import { Component, OnInit } from '@angular/core';
import { DataService, IPerson} from '../Services/data.service';
import { VehiclesService } from '../Services/vehicles.service';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss']
})
export class DataComponent implements OnInit {

  constructor(private data: DataService, private vehicles: VehiclesService) { }

  users: IPerson[];
  transport: any;

  ngOnInit() {
    this.data.getUsers().subscribe(x => this.users = x);
    this.vehicles.getData().subscribe(x =>  this.transport = x);
  }
}
