import {Component, ViewChild, ViewEncapsulation} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import { HttpClient } from '@angular/common/http';

const COLORS = [
  "uma excelente cadeira",
  "uma ótima cadeira",
  "uma cadeira mais ou menos",
  "uma cadeira boa",
  "uma cadeira ruim"
];
const NAMES = [
  "Fundamentos de programacao",
  "Programacao paralela",
  "Ética e cidadania",
  "Humanismo e cultura religiosa",
  "Programação baixo nível",
  "Sistemas digitais",
  "Matematica Concreta",
  "Matematica discreta"
];

export interface UserData {
  id: string;
  name: string;
  progress: string;
  color: string;
}

export interface Content {
  aulas: [];
  bibliography: [];
  material: [];
  name: string;
  _id: string;
}

/**
 * @title Table with sorting
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  displayedColumns = ["id", "name", "progress"];
  dataSource: MatTableDataSource<UserData>;
  CONTENT_DATA: Content[] | any

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private http: HttpClient) {
    // Create 100 users
    const users: UserData[] = [];
    for (let i = 1; i <= 100; i++) {
      users.push(createNewUser(i));
    }

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(users);
  }

  /**
   * Set the paginator and sort after the view init since this component will
   * be able to query its view for the initialized paginator and sort.
   */
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.http.get<Content>('http://3.21.130.129:5000/content/')
      .subscribe((data: Content) => {
        console.log(data);
        this.CONTENT_DATA = data;
      })
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
}

function createNewUser(id: number): UserData {
  const name = NAMES[Math.round(Math.random() * (NAMES.length - 1))];
  const desc = COLORS[Math.round(Math.random() * (COLORS.length - 1))];

  return {
    id: id.toString(),
    name: name,
    progress: desc,
    color: COLORS[Math.round(Math.random() * (COLORS.length - 1))]
  };
}
