import {Component, Inject, ViewChild, ViewEncapsulation} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {HttpClient} from '@angular/common/http';
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";

export interface Content {
  aulas: [];
  bibliography: [];
  material: [];
  name: string;
  description: string;
  _id: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None,
})

export class AppComponent {
  displayedColumns = ["id", "name", "description", "open"];
  dataSource: MatTableDataSource<Content>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private http: HttpClient, public dialog: MatDialog) {
  }

  openDialog(test) {
    console.log(test)
    this.dialog.open(DialogDataExampleDialog, {
      data: {...test}
    });
  }

  ngAfterViewInit() {
    this.http.get<Content>('http://3.21.130.129:5000/content/')
      .subscribe((data: Content[] | any) => {
        console.log(data);
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      })
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
}

@Component({
  selector: 'dialog-data-example-dialog',
  templateUrl: 'dialog-data-example-dialog.html',
})

export class DialogDataExampleDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: Content) {
  }
}
