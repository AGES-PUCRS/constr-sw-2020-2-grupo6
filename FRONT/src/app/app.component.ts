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
    displayedColumns = ["id", "name", "description", "open", "edit"];
    dataSource: MatTableDataSource<Content>;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(private http: HttpClient, public dialog: MatDialog) {
    }

    openViewDialog(data) {
        this.dialog.open(DialogView, {data});
    }

    openEditDialog(data) {
        this.dialog.open(DialogEdit, {data});
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
    selector: 'dialog-view',
    templateUrl: 'modalView.html',
})

export class DialogView {
    constructor(@Inject(MAT_DIALOG_DATA) public data: Content) {
    }
}

@Component({
    selector: 'dialog-edit',
    templateUrl: 'modalEdit.html',
})

export class DialogEdit {
    name: string;
    description: string;
    bibliography: [];
    material: [];
    aulas: [];

    constructor(@Inject(MAT_DIALOG_DATA) public data: Content) {
        this.name = data.name
        this.description = data.description
        this.bibliography = []
        for(let b of data.bibliography){
            // @ts-ignore
            this.bibliography.push([...b])
        }
        this.material = []
        for(let b of data.material){
            // @ts-ignore
            this.material.push([...b])
        }
        this.aulas = []
        for(let b of data.aulas){
            // @ts-ignore
            this.aulas.push([...b])
        }
    }
    submit(){
        console.log(this)
    }
}
